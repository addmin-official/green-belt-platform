import {
  useEffect,
  useRef,
  useState,
} from 'react';

type MapProject = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  treesSupported: number;
  compostReceived: number;
  survivalRate: number;
};

type GoogleProjectsMapProps<T extends MapProject> = {
  projects: T[];
  activeProjectId: string;
  onSelect: (project: T) => void;
};

let googleMapsPromise: Promise<void> | null = null;

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-green-belt-google-maps="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), {
        once: true,
      });

      existingScript.addEventListener(
        'error',
        () => reject(new Error('Google Maps failed to load.')),
        { once: true },
      );

      return;
    }

    const script = document.createElement('script');

    script.src =
      `https://maps.googleapis.com/maps/api/js` +
      `?key=${encodeURIComponent(apiKey)}` +
      `&v=weekly&language=ku&region=IQ`;

    script.async = true;
    script.defer = true;
    script.dataset.greenBeltGoogleMaps = 'true';

    script.addEventListener('load', () => resolve(), {
      once: true,
    });

    script.addEventListener(
      'error',
      () => reject(new Error('Google Maps failed to load.')),
      { once: true },
    );

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

export default function GoogleProjectsMap<T extends MapProject>({
  projects,
  activeProjectId,
  onSelect,
}: GoogleProjectsMapProps<T>) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key دیاری نەکراوە.');
      return;
    }

    let disposed = false;
    const listeners: google.maps.MapsEventListener[] = [];

    const initializeMap = async () => {
      try {
        await loadGoogleMaps(apiKey);

        if (
          disposed ||
          !mapElementRef.current ||
          projects.length === 0
        ) {
          return;
        }

        const map = new google.maps.Map(mapElementRef.current, {
          center: {
            lat: 36.2,
            lng: 44.2,
          },
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.HYBRID,
          fullscreenControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
        });

        const bounds = new google.maps.LatLngBounds();
        const infoWindow = new google.maps.InfoWindow();

        projects.forEach((project) => {
          const isActive = project.id === activeProjectId;

          const marker = new google.maps.Marker({
            map,
            position: {
              lat: project.lat,
              lng: project.lng,
            },
            title: project.name,
            animation: isActive
              ? google.maps.Animation.BOUNCE
              : undefined,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: isActive ? '#d4aa4d' : '#10b981',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
              scale: isActive ? 10 : 8,
            },
          });

          bounds.extend({
            lat: project.lat,
            lng: project.lng,
          });

          listeners.push(
            marker.addListener('click', () => {
              onSelect(project);

              infoWindow.setContent(`
                <div
                  dir="rtl"
                  style="
                    min-width: 220px;
                    color: #102017;
                    font-family: Arial, sans-serif;
                  "
                >
                  <strong style="font-size:14px;">
                    ${project.name}
                  </strong>

                  <div style="margin-top:8px;font-size:12px;">
                    ژمارەی درەخت:
                    ${project.treesSupported.toLocaleString()}
                  </div>

                  <div style="margin-top:4px;font-size:12px;">
                    کۆمپوست:
                    ${project.compostReceived} تەن
                  </div>

                  <div style="margin-top:4px;font-size:12px;">
                    ڕێژەی مانەوە:
                    ${project.survivalRate}٪
                  </div>
                </div>
              `);

              infoWindow.open({
                map,
                anchor: marker,
              });
            }),
          );
        });

        map.fitBounds(bounds, 70);

        google.maps.event.addListenerOnce(
          map,
          'bounds_changed',
          () => {
            if ((map.getZoom() ?? 0) > 10) {
              map.setZoom(10);
            }
          },
        );
      } catch (mapError) {
        console.error(mapError);

        if (!disposed) {
          setError(
            'نەخشەکە بار نەبوو؛ API key و سنووردارکردنەکانی بپشکنە.',
          );
        }
      }
    };

    void initializeMap();

    return () => {
      disposed = true;

      listeners.forEach((listener) => {
        listener.remove();
      });
    };
  }, [
    projects,
    activeProjectId,
    onSelect,
  ]);

  if (error) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-red-400/20 bg-red-950/20 p-6 text-center text-sm text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={mapElementRef}
      className="min-h-[420px] w-full overflow-hidden rounded-2xl border border-emerald-500/20"
      aria-label="نەخشەی پڕۆژەکانی کەمەربەندی سەوز"
    />
  );
}
