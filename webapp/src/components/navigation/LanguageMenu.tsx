import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
import UKFlag from "../../img/flags/UKFlag.png";
import SpainFlag from "../../img/flags/SpainFlag.png";
import FranceFlag from "../../img/flags/FranceFlag.png";
import GermanyFlag from "../../img/flags/GermanyFlag.png";
import ChinaFlag from "../../img/flags/ChinaFlag.png";
import AsturiasFlag from "../../img/flags/AsturiasFlag.png";

function LanguageMenu() {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const {t} = useTranslation();

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language).then(() => {
            console.log("Language changed correctly");
        });
        setSelectedLanguage(language);
    };

    return (
        <Dropdown className="nav-item dropdown">
            <Dropdown.Toggle className="nav-link dropdown-toggle">
                {t("language")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <div className="dropdown-item" onClick={() => handleLanguageChange('en')}>
                    <img src={UKFlag} width="24"/>
                    <Dropdown.Item active={selectedLanguage === 'en'}>
                        {t("english")}
                    </Dropdown.Item>
                </div>
                <div className="dropdown-item" onClick={() => handleLanguageChange('es')}>
                    <img src={SpainFlag} width="24"/>
                    <Dropdown.Item active={selectedLanguage === 'es'}>
                        {t("spanish")}
                    </Dropdown.Item>
                </div>
                <div className="dropdown-item" onClick={() => handleLanguageChange('fr')}>
                    <img src={FranceFlag} width="24"/>
                    <Dropdown.Item active={selectedLanguage === 'fr'}>
                        {t("french")}
                    </Dropdown.Item>
                </div>
                <div className="dropdown-item" onClick={() => handleLanguageChange('deu')}>
                    <img src={GermanyFlag} width="24"/>
                    <Dropdown.Item active={selectedLanguage === 'deu'}>
                        {t("german")}
                    </Dropdown.Item>
                </div>
                <div className="dropdown-item" onClick={() => handleLanguageChange('chn')}>
                    <img src={ChinaFlag} width="24"/>
                    <Dropdown.Item active={selectedLanguage === 'chn'}>
                        {t("chinese")}
                    </Dropdown.Item>
                </div>
                <div className="dropdown-item" onClick={() => handleLanguageChange('ast')}>
                    <img src={AsturiasFlag} width="24"/>
                    <Dropdown.Item active={selectedLanguage === 'ast'}>
                        {t("asturian")}
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default LanguageMenu;
