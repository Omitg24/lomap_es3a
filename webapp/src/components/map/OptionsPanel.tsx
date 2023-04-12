import Filter from "./options/Filter";
import Search from "./options/Search";
import FriendList from "../pod/FriendList";
import {initReactI18next, useTranslation} from "react-i18next";
import React from "react";
import i18n from "../../i18n";
import Mark from "./options/Mark";

i18n.use(initReactI18next)

function OptionsPanel() {

    const {t} = useTranslation();


    return (
        <div>
            <div id="optionsMenu">
                <h1>{t("options_menu")}</h1>
                <Search title={t("search")}/>
                <Filter titleFilter={t("category")} nameFilter={"option"}/>
                <Mark title={t("mark")}/>
                <div id="friendDiv">
                    <FriendList/>
                </div>

            </div>
        </div>
    )
}

export default OptionsPanel