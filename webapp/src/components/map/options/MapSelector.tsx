import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import {createNewMap, getMaps} from "../../pod/FriendsPOD";
import ReactDOM from "react-dom/client";
import MapView from "../MapView";
import Notification from "../../Notification";
import Icon from "../../../img/symbols/GOMapSymbol.png";


function MapSelector(props: {setItem: Function }){
    const {t} = useTranslation();
    const[maps,setMaps] = useState<string[]>([])
    const[selectedMap,setSelectedMap] = useState("")
    const {session} = useSession()
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        async function fetchMaps() {
            const mapsFromPOD = session.info.webId !== "" ? await getMaps(session) : undefined;
            if (mapsFromPOD) {
                setMaps(mapsFromPOD);
                setSelectedMap(mapsFromPOD[0])
                const root = ReactDOM.createRoot(document.getElementById("mapView") as HTMLElement);
                root.render(<MapView lat={43.3548057} lng={-5.8534646} webId={[mapsFromPOD[0]]}
                                     setItem={props.setItem}/>);
            }
        }
        fetchMaps()
    }, [session.info.webId,session]);

    function createNotification() {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 4000); // hide notification after 5 seconds
    }

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    function beautifyMapName(mapName: string): string {
        let uri = session.info.webId!.split("/").slice(0, 3).join("/").concat("/private/");
        let shortName = mapName.replace(uri, "").replace(".jsonld", "");
        return shortName.replace(shortName.charAt(0), shortName.charAt(0).toUpperCase()).replace("%20", "");
    }
    function changeMap(){
        let select = (document.getElementById("selectMap") as HTMLSelectElement).value
        setSelectedMap(select);
        const root = ReactDOM.createRoot(document.getElementById("mapView") as HTMLElement);
        root.render(<MapView lat={43.3548057} lng={-5.8534646} webId={[select]}
                             setItem={props.setItem}/>);
    }
    async function createMap(){
        let mapName = (document.getElementById("newMapTitle")as HTMLInputElement).value
        await createNewMap(session,mapName)
        await getMaps(session).then(newMaps =>{
            setMaps(newMaps)
            let uri = session.info.webId!.split("/").slice(0, 3).join("/").concat("/private/");
            let fileUrl = (uri + mapName).trim();
            setSelectedMap(fileUrl)
            const root = ReactDOM.createRoot(document.getElementById("mapView") as HTMLElement);
            root.render(<MapView lat={43.3548057} lng={-5.8534646} webId={[fileUrl]}
                                 setItem={props.setItem}/>);
            (document.getElementById("newMapTitle") as HTMLInputElement).value=""
            createNotification();
        })

    }

    return(
        <div id="differentMaps">
            <div id="mapSelector">
                <h2>{t("mapSelector")}</h2>
                {
                    (maps.length > 0) ?
                        <select value={selectedMap} onChange={changeMap} id="selectMap">
                            {
                                maps.map(map => (
                                    <option value={map} key={map}>{beautifyMapName(map)}</option>
                                ))
                            }
                        </select>
                        :
                        <p className="no-content">You don't have created maps</p>
                }

            </div>
            <div id="mapCreator">
                <h2>{t("createNewMap")}</h2>
                <input type="text" id="newMapTitle" placeholder={t("placesNamePlaceholder") ?? ""}/>
                <button id="createButton" onClick={createMap}>{t("create")}</button>
            </div>
            {
                showNotification &&
                (
                    <Notification
                        title={t("notificationMapAdded")}
                        message={t("notificationMessageMap")}
                        time={t("notificationTime")}
                        icon={Icon}
                        onClose={handleCloseNotification}
                    />
                )
            }
        </div>
    )
}
export default MapSelector