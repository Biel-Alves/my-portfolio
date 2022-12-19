import { DevicePhoneMobileIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { PageInfo, PageInfoFR, PageInfoNL, PageInfoPT } from "../../typings";
import { useRouter } from "next/router";
import { Form } from "../form";
import React from "react";

type Props = {
  pageInfo: PageInfo;
  pageInfoNL: PageInfoNL;
  pageInfoFR: PageInfoFR;
  pageInfoPT: PageInfoPT;
};

export const Contact = ({ pageInfo, pageInfoNL, pageInfoFR, pageInfoPT }: Props) => {
  let router = useRouter();

  const title =
    router.locale === "en"
      ? pageInfo?.contactTitle
      : router.locale === "nl"
      ? pageInfoNL?.contactTitle
      : router.locale === "fr"
      ? pageInfoFR?.contactTitle
      : router.locale === "pt"
      ? pageInfoPT?.contactTitle
      : "";

  return (
    <div className="h-screen relative flex justify-evenly items-center text-center md:text-left md:flex-row max-w-7xl px-10 mx-auto">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gold dark:text-tomato text-2xl font-bold">{title}</h3>

      <div className="space-y-10">
        <div className="flex flex-col items-center space-y-10">
          <div className="flex items-center space-x-5">
            <MapPinIcon className="text-gold dark:text-tomato w-7 animate-pulse" />
            <a href={pageInfo.googleMapsUrl} rel="noreferrer" target={"_blank"}>
              <p className="text-2xl cursor-pointer hover:text-green-400 dark:hover:text-honey hover:scale-[105%] transition-all duration-[0.5s]">
                {pageInfo?.address}
              </p>
            </a>
          </div>

          <div className="flex items-center space-x-5">
            <EnvelopeIcon className="text-gold dark:text-tomato w-7 h-7 animate-pulse" />
            <p className="text-2xl">{pageInfo?.email}</p>
          </div>

          <div className="flex items-center space-x-5">
            <DevicePhoneMobileIcon className="text-gold dark:text-tomato w-7 h-7 animate-pulse" />
            <p className="text-2xl">{pageInfo?.phoneNumber}</p>
          </div>
        </div>
        <Form pageInfo={pageInfo} pageInfoNL={pageInfoNL} pageInfoFR={pageInfoFR} pageInfoPT={pageInfoPT} />
      </div>
    </div>
  );
};