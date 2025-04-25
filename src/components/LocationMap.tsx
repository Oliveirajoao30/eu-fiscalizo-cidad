
import React, { useState, useEffect, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Import the leaflet declaration
import '../types/leaflet';

interface LocationMapProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    complemento?: string;
  }) => void;
  className?: string;
}

// Configuração para usar OpenStreetMap como fallback caso o Mapbox falhe
const useOpenStreetMap = true; // Ativar OpenStreetMap por padrão (não requer API key)

const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelect, className }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  // Função para inicializar o mapa com OpenStreetMap (não requer API key)
  const initializeLeafletMap = useCallback((latitude: number, longitude: number) => {
    if (!mapContainer) return;

    // Limpeza de mapas anteriores
    if (mapContainer.innerHTML) {
      mapContainer.innerHTML = '';
    }

    // Carrega Leaflet de CDN
    const loadLeaflet = async () => {
      if (!window.L) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(cssLink);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        
        document.body.appendChild(script);
        
        return new Promise<void>((resolve) => {
          script.onload = () => resolve();
        });
      }
      return Promise.resolve();
    };

    loadLeaflet().then(() => {
      // Now window.L is properly typed
      const L = window.L;
      
      const mapInstance = L.map(mapContainer).setView([latitude, longitude], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
      
      const markerInstance = L.marker([latitude, longitude], { draggable: true }).addTo(mapInstance);
      
      markerInstance.on('dragend', () => {
        const position = markerInstance.getLatLng();
        updateLocation(position.lat, position.lng);
      });
      
      mapInstance.on('click', (e: any) => {
        markerInstance.setLatLng(e.latlng);
        updateLocation(e.latlng.lat, e.latlng.lng);
      });
      
      // Guarda referências para controle
      setMap(mapInstance as any);
      setMarker(markerInstance as any);
    });
  }, [mapContainer]);

  const initializeMapboxMap = useCallback((latitude: number, longitude: number) => {
    if (!mapContainer) return;

    try {
      // Para ambiente de produção, use uma variável de ambiente
      mapboxgl.accessToken = 'pk.eyJ1IjoiZXVjaWRhZGVtYXBhIiwiYSI6ImNsc3Jya3E0dDA3a3AybHBnZ2NlNjRjOGcifQ.Ko1YS--4LZFgVMwjLBIPpQ';
      
      const mapInstance = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 15,
      });

      const markerInstance = new mapboxgl.Marker({
        draggable: true,
        color: '#000000',
      })
        .setLngLat([longitude, latitude])
        .addTo(mapInstance);

      markerInstance.on('dragend', () => {
        const lngLat = markerInstance.getLngLat();
        updateLocation(lngLat.lat, lngLat.lng);
      });

      mapInstance.on('click', (e) => {
        markerInstance.setLngLat(e.lngLat);
        updateLocation(e.lngLat.lat, e.lngLat.lng);
      });

      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

      setMap(mapInstance);
      setMarker(markerInstance);
    } catch (error) {
      console.error('Erro ao inicializar Mapbox, usando OpenStreetMap como fallback', error);
      initializeLeafletMap(latitude, longitude);
    }
  }, [mapContainer, initializeLeafletMap]);

  // Função para inicializar o mapa apropriado
  const initializeMap = useCallback((latitude: number, longitude: number) => {
    if (useOpenStreetMap) {
      initializeLeafletMap(latitude, longitude);
    } else {
      initializeMapboxMap(latitude, longitude);
    }
  }, [initializeLeafletMap, initializeMapboxMap]);

  const updateLocation = useCallback(async (latitude: number, longitude: number) => {
    try {
      // Utiliza Nominatim (OpenStreetMap) para geocodificação reversa - não requer API key
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.address) {
        const address = data.display_name;
        const bairro = data.address.suburb || data.address.neighbourhood || data.address.district || '';
        const cidade = data.address.city || data.address.town || data.address.village || '';
        const estado = data.address.state || '';
        const rua = data.address.road || '';
        const numero = data.address.house_number || '';
        const complemento = '';
        
        const endereco = rua + (numero ? `, ${numero}` : '');
        
        onLocationSelect({ 
          latitude, 
          longitude, 
          address: endereco || address, 
          bairro, 
          cidade, 
          estado,
          complemento 
        });
        
        toast({
          title: "Localização atualizada",
          description: "Os dados de endereço foram preenchidos automaticamente",
        });
      } else {
        onLocationSelect({ latitude, longitude });
      }
    } catch (error) {
      console.error('Erro ao obter endereço:', error);
      onLocationSelect({ latitude, longitude });
      toast({
        title: "Não foi possível obter o endereço completo",
        description: "Por favor, preencha os campos manualmente",
        variant: "destructive",
      });
    }
  }, [onLocationSelect, toast]);

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (map) {
          if (useOpenStreetMap) {
            // @ts-ignore - leaflet tem API diferente
            map.setView([latitude, longitude], 15);
            // @ts-ignore - leaflet tem API diferente
            marker?.setLatLng([latitude, longitude]);
          } else {
            // Mapbox
            map.flyTo({ center: [longitude, latitude], zoom: 15 });
            marker?.setLngLat([longitude, latitude]);
          }
        } else {
          initializeMap(latitude, longitude);
        }
        
        updateLocation(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
        toast({
          title: "Erro ao obter localização",
          description: "Por favor, permita o acesso à sua localização ou selecione manualmente no mapa.",
          variant: "destructive",
        });
        // Default to Rio de Janeiro coordinates if geolocation fails
        initializeMap(-22.9068, -43.1729);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, [map, marker, initializeMap, updateLocation, toast]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Localização no Mapa</h3>
        <Button
          onClick={getCurrentLocation}
          variant="outline"
          disabled={loading}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          {loading ? "Localizando..." : "Usar minha localização"}
        </Button>
      </div>
      <div 
        ref={setMapContainer}
        id="map" 
        className="w-full h-[300px] rounded-lg border border-gray-200 shadow-sm"
      />
    </div>
  );
};

export default LocationMap;
