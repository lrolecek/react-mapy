import React, { useState } from 'react';

import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import zahradkaImg from '../obrazky/zahradka.svg';
import uvnitrImg from '../obrazky/uvnitr.svg';

const Mapa = () => {

	const [viewport, setViewport] = useState({
		latitude: 49.19504165649414,
		longitude: 16.60830307006836,
		zoom: 16,
	});

	const [restaurace, setRestaurace] = useState([
		{
			id: 1,
			nazev: 'Zlatá loď',
			latitude: 49.1955261,
			longitude: 16.6083544,
			ikona: zahradkaImg,
		},
		{
			id: 2,
			nazev: "Mc'Donnald's",
			latitude: 49.1947328,
			longitude: 16.6079272,
			ikona: uvnitrImg,
		},
		{
			id: 3,
			nazev: 'Caffé restaurant Pellegrini',
			latitude: 49.1945533,
			longitude: 16.6081275,
			ikona: zahradkaImg,
		},
	]);

	const [vybranaRestaurace, setVybranaRestaurace] = useState(null);

	return (
		<>
			<ReactMapGL
				mapStyle={{
					version: 8,
					sources: {
						'raster-tiles': {
							type: 'raster',
							tiles: ['https://mapserver.mapy.cz/base-m/{z}-{x}-{y}'],
							tileSize: 256,
							attribution:
								'Mapové podklady od <a target="_top" rel="noopener" href="https://mapy.cz/">Seznam.cz</a> a <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>.',
						},
					},
					layers: [
						{
							id: 'simple-tiles',
							type: 'raster',
							source: 'raster-tiles',
							minzoom: 0,
							maxzoom: 20,
						},
					],
				}}
				{...viewport}
				onViewportChange={(nextViewport) => setViewport(nextViewport)}
				width="100%"
				height="450px"
			>

				<GeolocateControl
					style={{
						right: 10,
						top: 10
					}}
					positionOptions={{ enableHighAccuracy: true }}
					trackUserLocation={true}
					auto
				/>

				{restaurace.map((item) => (
					<React.Fragment key={item.id}>

						<Marker
							latitude={item.latitude}
							longitude={item.longitude}
							offsetLeft={-25}
							offsetTop={-50}
						>
							<img
								src={item.ikona}
								width={50}
								height={50}
								alt={item.nazev}
								onClick={() => setVybranaRestaurace(item.id)}
							/>
						</Marker>

						{item.id === vybranaRestaurace ? (
							<Popup
								latitude={item.latitude}
								longitude={item.longitude}
								offsetTop={-60}
								onClose={() => setVybranaRestaurace(null)}
							>
								{item.nazev}
							</Popup>
						) : null}

					</React.Fragment>
				))}

			</ReactMapGL>
		</>
	);
};

export default Mapa;
