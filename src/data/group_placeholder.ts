// import { Group } from "@/store/interface";



// export const groupsData:Group[] = [
//   {
//     id: "g1",
//     long_name: "Nigerian Political Science Association",
//     short_name: "NPSA",
//     location: "Ilorin, Kwara State Nigeria",
//     category: "Communication",
//     logo: "https://www.ipsa.org/sites/default/files/grprofile/NPSA%20LOGO.jpg",
//   },
//   {
//     id: "g2",
//     long_name: "NACCIMA BUSINESS WOMEN GROUP",
//     short_name: "NACCIMA",
//     location: "Ikeja-GRA, Lagos",
//     category: "Business",
//     logo: "https://nepc.gov.ng/business-support-organizations-directory-for-women-entrepreneurs/public/uploads/logo/naccima-business-women.png"
//   },
//   {
//     id: "g3",
//     long_name: "Asaba Development Union",
//     short_name: "ADU Worlwide",
//     location: "Asaba, Nigeria",
//     category: "Town",
//     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtoWAuP2GotaHam7SI-zKW2snNlNtfRP0hlg&s"
//   },
//   {
//     id: "g4",
//     long_name: "Sustainable Energy Network",
//     short_name: "SEN",
//     location: "Berlin, Germany",
//     category: "Environmental",
//     logo: "https://sustainable-energy-week.ec.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2023-12/SEYN_Logo_3_Black.png?itok=K8UZ1Er5"
//   },
//   {
//     id: "g5",
//     long_name: "Urban Development Agency",
//     short_name: "UDA",
//     location: "Toronto, Canada",
//     category: "Urban Planning",
//     logo: "data:image/png;base64,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"
//   },
//   {
//     id: "g6",
//     long_name: "Youth Empowerment Forum",
//     short_name: "YEF",
//     location: "Cape Town, South Africa",
//     category: "Social Services",
//     logo: "https://www.peacemakersnetwork.org/wp-content/uploads/2022/04/members-landing-page-logos-13.png"
//   },
//   {
//     id: "g7",
//     long_name: "Green Earth Organization",
//     short_name: "GEO",
//     location: "Sydney, Australia",
//     category: "Environmental",
//     logo: "https://greenearth.net.nz/wp-content/uploads/2021/05/cropped-greenearth-logo.jpeg?w=516"
//   },
//   {
//     id: "g9",
//     long_name: "Culinary Arts Society",
//     short_name: "CAS",
//     location: "Paris, France",
//     category: "Culinary",
//     logo: "https://static.wixstatic.com/media/24c821_72a421af374e41249f0d3d1b573a30e3~mv2.png/v1/crop/x_410,y_410,w_3780,h_3750/fill/w_394,h_390,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/1.png"
//   },
//   {
//     id: "g10",
//     long_name: "Wildlife Conservation Network",
//     short_name: "WCN",
//     location: "Nairobi, Kenya",
//     category: "Conservation",
//     logo: "https://wildlifedirect.org/wp-content/uploads/2020/03/WildlifeConservationNetworkWCNLogo-400x225.png"
//   },
//   {
//     id: "g14",
//     long_name: "Performing Arts Guild",
//     short_name: "PAG",
//     location: "Chicago, IL",
//     category: "Arts & Entertainment",
//     logo: "https://beverlytheatreguild.org/wp-content/uploads/2023/08/BTG-Logo.png"
//   }
// ]
