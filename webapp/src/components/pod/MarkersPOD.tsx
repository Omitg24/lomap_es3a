import {Session} from "@inrupt/solid-client-authn-browser";
import {getFile} from "@inrupt/solid-client";
import {Icon} from "leaflet";
import {Marker} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {useSession} from "@inrupt/solid-ui-react";
import {Point} from "./Point";
import {v4 as uuidv4} from 'uuid';
import * as React from "react";
import {useEffect, useState} from "react";
import BarIcon from "../../img/icons/bar.png";
import RestaurantIcon from "../../img/icons/restaurant.png";
import ShopIcon from "../../img/icons/shop.png";
import SupermarketIcon from "../../img/icons/supermarket.png";
import HotelIcon from "../../img/icons/hotel.png";
import CinemaIcon from "../../img/icons/cinema.png";
import PublicIcon from "../../img/icons/public.png";
import AcademicIcon from "../../img/icons/academic.png";
import SportIcon from "../../img/icons/sport.png";
import MuseumIcon from "../../img/icons/museum.png";
import ParkIcon from "../../img/icons/park.png";
import OtherIcon from "../../img/icons/other.png";

interface IDictionary {
    [index: string]: string;
}

let categories = {
    All: markerIconPng,
    Bars: BarIcon,
    Restaurants: RestaurantIcon,
    Shops: ShopIcon,
    Supermarkets: SupermarketIcon,
    Hotels: HotelIcon,
    Cinemas: CinemaIcon,
    Academic_Institution: AcademicIcon,
    Public_Institution: PublicIcon,
    Sports_Club: SportIcon,
    Museum: MuseumIcon,
    Parks: ParkIcon,
    Others: OtherIcon
} as IDictionary

async function readFileFromPod(fileURL: string[], session: Session) {
    try {
        let markers = []
        for (const element of fileURL) {
            const file = await getFile(
                element,
                {fetch: session.fetch}
            );
            let fileContent = await file.text()
            let fileJSON = JSON.parse(fileContent)
            for (const element of fileJSON) {
                let latitude = Number(element.latitude);
                let longitude = Number(element.longitude);
                let name = element.name;
                let category = element.category;
                let score = element.score;
                let comment = element.comment;
                let e = document.getElementById("category");
                // @ts-ignore
                let text = e.options[e.selectedIndex].value;
                if (category === text || text === "All")
                    markers.push(new Point(uuidv4(), latitude, longitude, name, category, comment, score))
            }

        }
        return markers
    } catch (err) {
        console.log(err);
    }
}


function MarkersPOD(props: { webId: string[], setItem: Function }) {
    const {session} = useSession();
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        async function fetchPoints() {
            const newPoints = props.webId !== undefined ? await readFileFromPod(props.webId, session) : undefined;
            if (newPoints) {
                setPoints(newPoints);
            }
        }

        fetchPoints();
    }, [props.webId, session]);

    return (
        <div>
            {
                points.map((item) => (
                    <Marker key={item.id} position={{lat: item.latitude, lng: item.longitude}}
                            icon={new Icon({
                                iconUrl: categories[item.category] !== undefined ? categories[item.category] : markerIconPng
                            })}
                            eventHandlers={{
                                click: (e) => {
                                    const addMarkerPanel = document.getElementById("addMarkerPanel");
                                    if (addMarkerPanel !== null) {
                                        addMarkerPanel.style.width = "0";
                                    }

                                    const showMarkerPanel = document.getElementById("showMarkerPanel");
                                    if (showMarkerPanel !== null) {
                                        showMarkerPanel.style.width = "25vw";
                                    }
                                    props.setItem(item);
                                }
                            }}>
                    </Marker>
                ))
            }
        </div>
    )
}

export default MarkersPOD;
