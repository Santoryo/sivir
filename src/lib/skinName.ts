export default function name(skins: any) {
    if(skins.formatName == skins.name)
    {
        return skins.formatName + " " + skins.championName
    }
    else
    {
        return skins.formatName
    }
}