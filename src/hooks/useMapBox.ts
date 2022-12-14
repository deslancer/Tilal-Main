import { useEffect, useRef } from "react";
declare const mapboxgl: any;
declare const turf: any;
mapboxgl.accessToken =
    "pk.eyJ1Ijoic3Z5c3R1bnAiLCJhIjoiY2tha3VrbXIxMDVnZzJ6bXZmdXZjN2ptayJ9.gtQcWk0OFvGTAwU8INr-hg"; //Ключ, который нужно будет заменить

const points = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [46.66171, 24.84694],
            },
            properties: {
                title: "King Salman Bin Abdulaziz Rd",
                id: 0,
                type: "road",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere ac ut consequat semper viverra nam libero. Malesuada nunc vel risus commodo viverra maecenas accumsan. Id semper risus in hendrerit gravida rutrum quisque. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. A erat nam at lectus urna duis convallis. Augue neque gravida in fermentum et sollicitudin ac orci. Morbi tristique senectus et netus. At consectetur lorem donec massa sapien faucibus. Commodo elit at imperdiet dui. Blandit libero volutpat sed cras ornare arcu dui vivamus. Sit amet nisl purus in mollis nunc sed. Mauris cursus mattis molestie a iaculis. Mauris nunc congue nisi vitae suscipit. Ac tortor vitae purus faucibus.",
                img: "images/higway.jpg",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [46.72574, 24.84794],
            },
            properties: {
                title: "Princess Nourah Bint Abdul Rahman University",
                id: 1,
                type: "education",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere ac ut consequat semper viverra nam libero. Malesuada nunc vel risus commodo viverra maecenas accumsan. Id semper risus in hendrerit gravida rutrum quisque. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. A erat nam at lectus urna duis convallis. Augue neque gravida in fermentum et sollicitudin ac orci. Morbi tristique senectus et netus. At consectetur lorem donec massa sapien faucibus. Commodo elit at imperdiet dui. Blandit libero volutpat sed cras ornare arcu dui vivamus. Sit amet nisl purus in mollis nunc sed. Mauris cursus mattis molestie a iaculis. Mauris nunc congue nisi vitae suscipit. Ac tortor vitae purus faucibus.",
                img: "images/university.jpg",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [46.69893, 24.96977],
            },
            properties: {
                title: "King Khalid International Airport",
                id: 2,
                type: "airports",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere ac ut consequat semper viverra nam libero. Malesuada nunc vel risus commodo viverra maecenas accumsan. Id semper risus in hendrerit gravida rutrum quisque. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. A erat nam at lectus urna duis convallis. Augue neque gravida in fermentum et sollicitudin ac orci. Morbi tristique senectus et netus. At consectetur lorem donec massa sapien faucibus. Commodo elit at imperdiet dui. Blandit libero volutpat sed cras ornare arcu dui vivamus. Sit amet nisl purus in mollis nunc sed. Mauris cursus mattis molestie a iaculis. Mauris nunc congue nisi vitae suscipit. Ac tortor vitae purus faucibus.",
                img: "images/airport.jpg",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [46.60971, 24.8212],
            },
            properties: {
                title: "Avenues Mall",
                id: 3,
                type: "mall",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere ac ut consequat semper viverra nam libero. Malesuada nunc vel risus commodo viverra maecenas accumsan. Id semper risus in hendrerit gravida rutrum quisque. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. A erat nam at lectus urna duis convallis. Augue neque gravida in fermentum et sollicitudin ac orci. Morbi tristique senectus et netus. At consectetur lorem donec massa sapien faucibus. Commodo elit at imperdiet dui. Blandit libero volutpat sed cras ornare arcu dui vivamus. Sit amet nisl purus in mollis nunc sed. Mauris cursus mattis molestie a iaculis. Mauris nunc congue nisi vitae suscipit. Ac tortor vitae purus faucibus.",
                img: "images/mall1.jpg",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [46.67004, 24.81945],
            },
            properties: {
                title: "Mall Of Saudi Brought to you by Majid Al Futtaim",
                id: 4,
                type: "mall",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere ac ut consequat semper viverra nam libero. Malesuada nunc vel risus commodo viverra maecenas accumsan. Id semper risus in hendrerit gravida rutrum quisque. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. A erat nam at lectus urna duis convallis. Augue neque gravida in fermentum et sollicitudin ac orci. Morbi tristique senectus et netus. At consectetur lorem donec massa sapien faucibus. Commodo elit at imperdiet dui. Blandit libero volutpat sed cras ornare arcu dui vivamus. Sit amet nisl purus in mollis nunc sed. Mauris cursus mattis molestie a iaculis. Mauris nunc congue nisi vitae suscipit. Ac tortor vitae purus faucibus.",
                img: "images/mall2.jpg",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [46.63492, 24.8469],
            },
            properties: {
                title: "American International School- AISR",
                id: 5,
                type: "education",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere ac ut consequat semper viverra nam libero. Malesuada nunc vel risus commodo viverra maecenas accumsan. Id semper risus in hendrerit gravida rutrum quisque. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. A erat nam at lectus urna duis convallis. Augue neque gravida in fermentum et sollicitudin ac orci. Morbi tristique senectus et netus. At consectetur lorem donec massa sapien faucibus. Commodo elit at imperdiet dui. Blandit libero volutpat sed cras ornare arcu dui vivamus. Sit amet nisl purus in mollis nunc sed. Mauris cursus mattis molestie a iaculis. Mauris nunc congue nisi vitae suscipit. Ac tortor vitae purus faucibus.",
                img: "images/school.jpg",
            },
        },
    ],
};

export default function useMapBox(mapContainerRef: any) {
    const map = useRef<any>(null);

    const housePoint: string = "point";
    const bbox: any = turf.extent(points);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            style: "mapbox://styles/svystunp/cl42gcthv001315mp5kvv3j88", //Кастомный стиль карты с выделенными подписями улиц
            center: [46.6441086, 24.8956462], // Стартовая позиция [lng, lat]
            zoom: 14,
            container: mapContainerRef.current,
            antialias: true,
        });

        map.current.on("load", async () => {
            //Загрузка иконки городка и добавление координат
            map.current.loadImage("images/icons/house2.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("custom-marker", image);
            });
            map.current.loadImage("images/icons/road.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("road", image);
            });
            map.current.loadImage("images/icons/airport.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("airports", image);
            });
            map.current.loadImage("images/icons/education.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("education", image);
            });
            map.current.loadImage("images/icons/mall.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("mall", image);
            });

            map.current.loadImage("images/icons/road_h.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("road-h", image);
            });
            map.current.loadImage("images/icons/airport_h.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("airports-h", image);
            });
            map.current.loadImage("images/icons/education_h.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("education-h", image);
            });
            map.current.loadImage("images/icons/mall_h.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("mall-h", image);
            });

            map.current.loadImage("images/icons/pin.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("pin", image);
            });

            map.current.loadImage("images/icons/car.png", (error: Error, image: any) => {
                if (error) throw error;
                map.current.addImage("customCar", image);
            });

            const point = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [
                                46.6441086, 24.8956462
                            ]
                        },
                        'properties': {
                            'title': 'Tilal Homes in Narjis'
                        }
                    }
                ]
            };

            map.current.addSource("points", {
                type: "geojson",
                data: points,
            });

            //Добавление точки городка
            map.current.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-allow-overlap': true,
                    'text-allow-overlap': false,
                    'icon-image': ['get', 'type'],
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Regular',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });

            for (const feature of point.features) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.cursor = 'pointer';
                el.addEventListener('click', ()=>{
                    window.location.assign(`/area`);
                })
                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);
            }
            map.current.fitBounds(bbox, { padding: 30 });
        });

        //При клике на карту удаляются активные маршруты
        map.current.on("click", (e: any) => {
            removeRoute();
        });
        //Функция клика на точку
        map.current.on("click", "points", (e: any) => {
            //координаты для попапа
            console.log(e.features[0]);

            const coordinates = e.features[0].geometry.coordinates.slice();

            //контент попапа
            const description =
                "<h2>" +
                e.features[0].properties.title +
                "</h2><p><img src = " +
                e.features[0].properties.img +
                " width = '225'></p><p>" +
                e.features[0].properties.text +
                "</p>";

            //созание попапа
            const popup = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map.current);
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            //Закоментированная возможность сторить маршруты с клика на точку
            //animateRoute(data.features[e.features[0].properties.id]);
        });

        //Фильтр точек
        /*  function filterData(){
            const filterId = ['in', 'type'];
            const filter = document.getElementsByName('filter');
            for (let a = 0; a < filter.length; a++){
                if(filter[a].checked == true){
                    filterId.push(filter[a].value);

                };
            }


            map.setFilter("points", filterId);


        };*/
    }); // eslint-disable-line react-hooks/exhaustive-deps

    let timer: any;
    //Прорисовка маршрутов
    function animateRoute(data: any) {
        //Данные для выделения иконки
        const icon = data.properties.type + "-h";

        removeRoute();
        const coordinates = data.geometry.coordinates;

        const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);

        for (const coord of coordinates) {
            bounds.extend(coord);
        }

        map.current.fitBounds(bounds, {
            padding: 30,
        });

        data.geometry.coordinates = [coordinates[0]];

        const dataSource = "trace";
        map.current.addSource(dataSource, { type: "geojson", data: data });
        map.current.addLayer({
                'id': 'route',
                'type': 'line',
                'source': dataSource,
                'paint': {
                    'line-color': '#954098',
                    'line-opacity': 0.75,
                    'line-width': 5
                }
            }
        );

        const labelCoord = coordinates[Math.round(coordinates.length / 2)];

        let i = 0;

        timer = setInterval(() => {
            if (i < coordinates.length) {
                data.geometry.coordinates.push(coordinates[i]);
                map.current.getSource(dataSource).setData(data);
                i++;
            } else {
                window.clearInterval(timer);
            }
        }, 0.001);

        //Добавление точки для подписи расстояния и времени
        map.current.addSource("label", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: labelCoord,
                        },
                        properties: {
                            title: data.properties.description,
                        },
                    },
                ],
            },
        });

        //Добавление точки на маршруте
        map.current.addLayer({
            id: "label",
            type: "symbol",
            source: "label",
            layout: {
                "icon-allow-overlap": true,
                "text-allow-overlap": true,
                "icon-image": "customCar",
                "text-field": ["get", "title"],
                "text-font": ["Open Sans Regular", "Arial Unicode MS Bold"],
                "text-offset": [1.5, 0],
                "text-anchor": "left",
            },
        });

        //Выделение точки старта маршрута
        map.current.addSource("higlight", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: coordinates[0],
                        },
                        properties: {},
                    },
                ],
            },
        });
        map.current.addLayer({
            id: "higlight",
            type: "symbol",
            source: "higlight",
            layout: {
                "icon-image": icon,
                "icon-allow-overlap": true,
                "text-allow-overlap": false,
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 1.25],
                "text-anchor": "top",
            },
        });

        /*//Выделение конца маршрута
                map.addLayer({
                    "id": "circle",
                    "source": "point",
                    "type": "circle",
                    "paint": {
                        "circle-radius": 100,
                        "circle-opacity": 0,
                        "circle-stroke-width": 5,
                        "circle-stroke-color": "#954098",
                        "circle-stroke-opacity": 1,
                    }
                });*/
    }

    //Удаление маршрута
    function removeRoute() {
        if (map.current.getLayer("circle")) {
            map.current.removeLayer("circle");
        }
        if (map.current.getLayer("route")) {
            map.current.removeLayer("route");
        }
        if (map.current.getLayer("label")) {
            map.current.removeLayer("label");
        }
        if (map.current.getLayer("higlight")) {
            map.current.removeLayer("higlight");
        }
        if (map.current.getSource("higlight")) {
            map.current.removeSource("higlight");
        }
        if (map.current.getSource("trace")) {
            map.current.removeSource("trace");
        }
        if (map.current.getSource("label")) {
            map.current.removeSource("label");
        }

        map.current.fitBounds(bbox, { padding: 30 });
        window.clearInterval(timer);
    }

    return { animateRoute, removeRoute };
}
