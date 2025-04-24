
import React, { useState, useEffect, useCallback } from 'react';
import { Map, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationMapProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address?: string;
    bairro?: string;
  }) => void;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelect, className }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initializeMap = useCallback((latitude: number, longitude: number) => {
    if (!mapboxgl.accessToken) {
      // For demo purposes, using a temporary token. In production, this should be stored in environment variables
      mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHNqd2F2NW0wMXUyMnFxbzB5ZnB3a2d2In0.JDk4cfZAwOSAOGKs1tCkbg';
    }

    const mapInstance = new mapboxgl.Map({
      container: 'map',
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

    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

    setMap(mapInstance);
    setMarker(markerInstance);
  }, []);

  const updateLocation = useCallback(async (latitude: number, longitude: number) => {
    try {
      // Reverse geocoding using Mapbox
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        const bairro = data.features.find((f: any) => f.place_type.includes('neighborhood'))?.text;
        
        onLocationSelect({ latitude, longitude, address, bairro });
      } else {
        onLocationSelect({ latitude, longitude });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      onLocationSelect({ latitude, longitude });
    }
  }, [onLocationSelect]);

  const getCurrentLocation = useCallback(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (map && marker) {
          map.flyTo({ center: [longitude, latitude], zoom: 15 });
          marker.setLngLat([longitude, latitude]);
        } else {
          initializeMap(latitude, longitude);
        }
        
        updateLocation(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        toast({
          title: "Erro ao obter localização",
          description: "Por favor, permita o acesso à sua localização ou selecione manualmente no mapa.",
          variant: "destructive",
        });
        // Default to city center coordinates if geolocation fails
        initializeMap(-22.9068, -43.1729); // Rio de Janeiro coordinates
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
        id="map" 
        className="w-full h-[300px] rounded-lg border border-gray-200 shadow-sm"
      />
    </div>
  );
};

export default LocationMap;
