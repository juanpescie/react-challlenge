import React, { useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { BUILDINGS_ON_SALE_GEOJSON_SOURCE } from '../data'
import Panel from './Panel/Panel';
import { getParcelInfo } from '../redux/actions';
import style from './Map.module.css'


mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9tZXRyaWNzIiwiYSI6ImNqOGJ2ZXIzazAxd3kyd3AyMDVrOGpzNWkifQ.KwvwFfoDOeLnjR1gEHO8tg';
const marginDrawer = '75vw'
const i = {marginLeft: marginDrawer, transition: '0.4s'}
function Map(props) {
	const map = useRef(null);
	const mapContainer = useRef(null);
	const {booleanDrawer, properties} = useSelector((state)=> state)
	const dispatch = useDispatch()
	
	const mapContainerStyle = {
		position: 'absolute',
		top: 0,
		bottom: 0,
		height: '100%',
		width: booleanDrawer ? marginDrawer : '100vw'
	};
	/* UseEffect: Loads the map when the Map component is mounted */
	useEffect(() => {
		/* Create a map instance in a specific HTML element container (referenced by
		the mapContainer useRef), using a specific style (the basemap), and with other
		configuration parameters like the initial center coordinates and zoom level */
		map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center:[
	      -3.695,
	      40.4496
	    ],
	    zoom: 15,
    });

		// Add map navigation controls (zoom and rotation)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');

    /* When the map style (basemap) loads, then we can load our sources (geospatial data),
    layers (visual representations of that geospatial data over the map)
    and layers' event handlers */
    map.current.on('style.load', () => {
    	// Add source
			map.current.addSource('parcels-for-sale-source', {
				type: 'geojson',
				data: BUILDINGS_ON_SALE_GEOJSON_SOURCE
			});
			 
			// Add layer
			map.current.addLayer({
				'id': 'parcels-for-sale-layer',
				'type': 'fill',
				'source': 'parcels-for-sale-source',
				'paint': {
					'fill-color': 'rgb(255, 185, 0)',
					'fill-opacity': 0.9,
					'fill-outline-color': 'rgb(38, 247, 202)'
				}
			});

			// Add layer mousemove event handler to change cursor to pointer when hovering
			// over a parcel on sale
			map.current.on('mousemove', 'parcels-for-sale-layer', () => {
				map.current.getCanvas().style.cursor = 'pointer';
			});

			// Add layer mouseleave event handler to change cursor back to normal
			map.current.on('mouseleave', 'parcels-for-sale-layer', () => {
				map.current.getCanvas().style.cursor = '';
			});

			// Add layer click event handler
			map.current.on('click', 'parcels-for-sale-layer', e => {
				const clickedFeature = e.features[0];
				console.log('Clicked feature: ', clickedFeature);
				console.log('Clicked feature properties: ', clickedFeature.properties);
				
				/***************************
				 CONTINUE WORKING HERE...
				 ***************************/
				dispatch(getParcelInfo(clickedFeature.properties, booleanDrawer))
				

			});
		});
	}, []);
	return (
	<div className={style.flex}>
    	<div ref={mapContainer} style={mapContainerStyle}></div>
		<div style={i}>
			{booleanDrawer ? <Panel info={properties} />: null}
		</div>
	</div>

  );
}

export default Map;
