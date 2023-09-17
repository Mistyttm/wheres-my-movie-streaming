export type ServiceData = {
    service: string;
    streamingType: string;
    quality: string;
    link: string;
    audios: { language: string; region: string }[];
    subtitles: {locale: {language: string; region: string;}[]; closedCaptions: boolean}[];
    price: {amount: string; currency: string; formatted: string;};
    availableSince: number;
    videoLink: string;
};