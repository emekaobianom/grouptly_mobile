import { User, Member } from "@/store/interface";

export const memberFullname = (user: User | Member) => `${user.firstname} ${user.lastname}`;

//problem - when image is updated in the db with thesame name the app will refuse to change the old image
//solution - add a dynamic query to the image url to force the browser to reload the image
//this will force the browser to reload the image from the server
export const getDynamicImageName = (imageDbUrl: String | undefined) => {
    if (imageDbUrl == undefined) return undefined;
    return `${imageDbUrl}? ${Date.now()}`;
}
