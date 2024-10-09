// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Station } from "@/entities/station";
import { Options } from "@/shared/types";

export enum Cities {
  MOSCOW = "Москва",
  SAINT_PETERSBURG = "Санкт-Петербург",
  NOVOSIBIRSK = "Новосибирск",
  EKATERINBURG = "Екатеринбург",
  NIZHNY_NOVGOROD = "Нижний Новгород",
  KAZAN = "Казань",
  CHELYABINSK = "Челябинск",
  SAMARA = "Самара",
  OMSK = "Омск",
  ROSTOV_ON_DON = "Ростов-на-Дону",
  UFA = "Уфа",
  KRASNOYARSK = "Красноярск",
  PERM = "Пермь",
  VOLGOGRAD = "Волгоград",
  VORONEZH = "Воронеж",
  KRASNODAR = "Краснодар",
  SARATOV = "Саратов",
  TYUMEN = "Тюмень",
  TOLYATTI = "Тольятти",
  IZHEVSK = "Ижевск",
  BARNAUL = "Барнаул",
  ULYANOVSK = "Ульяновск",
  IRKUTSK = "Иркутск",
  KHABAROVSK = "Хабаровск",
  YAROSLAVL = "Ярославль",
  VLADIMIR = "Владимир",
  TOMSK = "Томск",
  KALININGRAD = "Калининград",
  KIROV = "Киров",
  TULA = "Тула",
}

export interface City extends Options<string, "name"> {
  stations: Station[];
}
