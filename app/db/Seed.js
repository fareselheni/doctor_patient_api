const db = require("../models");
const Specialite = db.specialite;
const Role = db.role
const Gouvernorat = db.gouvernorat

const listSpecialite= ["Cardiologue (Cœur)",'Chirurgien Esthétique','Chirurgien Orthopédiste Traumatologue',"Dentiste (Dents)","Dermatologue (Peau)","Endocrinologue Diabétologue","Gastro-entérologue","Généraliste","Gynécologue Obstétricien","Interniste","Néphrologue","Neurologue (Cerveau et Nerfs)","Nutritionniste","Ophtalmologue (Yeux)","Oto-Rhino-Laryngologiste (ORL) (Oreille nez gorge)","Pédiatre (Enfant)","Pneumologue","Psychiatre (Troubles mentaux)","Psychothérapeute","Radiologue,Rhumatologue","Sexologue","Urologue","Acupuncture","Addictologue","Algologue (Douleur)","Allergologue","Anatomo-Cyto-Pathologiste","Andrologue,Anesthésiste-Réanimateur","Angiologue,Audiologiste","Audioprothésiste","Biochimiste","Biochimiste Clinique","Biologiste Medicale","Biophysique","Cancérologue","Cardiologue"
,"Centre dimagerie" ,"médicale","Chiropracteur","Chirurgie plastique et réparatrice","Chirurgien","Chirurgien Cancérologue","Chirurgien capillaire ","Chirurgien Cardio-Vasculaire  ","Chirurgien Cardio-Vasculaire Thoracique ","Chirurgien de l'obésité ","Chirurgien Esthétique ","Chirurgien Généraliste ","Chirurgien Maxillo Facial et Esthétique ","Chirurgien Maxillo Facial Stomatologue ","Chirurgien Orthopédiste Traumatologue ","Chirurgien Pédiatrique ","Chirurgien Plasticien ","Chirurgien Thoracique ","Chirurgien Urologue ","Chirurgien vasculaire ","Chirurgien viscéral et digestif ","Dentiste (Dents) ","Dermatologue (Peau)  ","Diabétologue ","Diététicien ","Embryologiste ","Endocrinologue ","Endocrinologue Diabétologue ","Endodontiste ","Epidemiologiste ","Ergothérapeute ","Gastro-entérologue ",
"Généraliste ","Généticien ","Gériatre ","Gynécologue ","Gynécologue Obstétricien ","Hématologue ","Hématologue Clinique ","Hématopathologiste ","Hépatologue (Foie) ","Hypnothérapeute ","Imagerie Médicale ","Immunologiste ","Immunopathologiste","Implantologue","Infirmier","Interniste","Interniste Maladies Infectieuses","Interniste Réanimation Médicale","Kinésithérapeute","Laboratoire d'analyses de biologie médicale","Laboratoire d'anatomie et cytologie pathologiques","Laboratoire de cytogénétique","Maladies Infectieuses","Médecin Biologiste","Médecin de famille","Médecin du sommeil","Médecin du sport","Médecin du Travail","Médecin Esthétique","Médecin Hémodialyseur","Médecin homéopathe","Médecin Légiste","Médecin Nucléaire","Médecin Physique Réadaptateur","Médecin urgentiste","Médecine douce et alternative",
"Médecine morphologique et anti-âge","Médecine Préventive","Médecine tropicale","Microbiologiste","Néonatologiste","Néphrologue","Neurochirurgien","Neurologue (Cerveau et Nerfs)","Neuropédiatre","Neurophysiologiste","Neuropsychiatre","Neuropsychologue","Nutrithérapeute","Nutritionniste","Oncologue","Oncologue-Chimiothérapeute","Oncologue-Radiothérapeute","Ophtalmologiste (Yeux)","Opticien","Orthodontiste","Orthopédiste (Os)","Orthopédiste Traumatologue","Orthophoniste","Orthoptiste","Ostéopathe","Parasitologiste","Parodontiste implantologiste","Pédiatre (Enfant)","Pédodontiste","Pédopsychiatre","Perineologue","Pharmacien","Pharmacien Biologiste","Pharmacologue","Phlébologue","Physiologiste","Physiothérapeute","Phytothérapeute","Pneumologue","Podologue","Posturologue",
"Proctologue","Prothésiste Capillaire","Prothésiste dentaire","Psychanalyste","Psychiatre (Troubles mentaux)","Psychologue","Psychologue clinicien","Psychomotricien","Psychothérapeute","Radiologue","Radiothérapeute","Réanimateur Médical","Réflexologue","Rhumatologue","Sage femme","Santé publique et médecine sociale","Sénologue","Sexologue","Stomatologue","Urodynamique","Urologue","Vétérinaire"]
const listRole=['admin','doctor','patient']
const listGouvernorat=['Tunis','Bizerte','Ariana','Manouba','Ben Arous','Zaghouan','Nabeul','Jendouba','Béja','Kef','Seliana','Sousse','Monastir','Mahdia','Kairouan','Kasserine','Sidi Bouzid','Sfax','Gabes','Tataouin','Médenine','Gafsa','Tozeur','Kébili']
addSpecialite = () => {
    Specialite.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          for(let i =0 ;i<listSpecialite.length;i++)
          {
            new Specialite({
                name: listSpecialite[i]
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added "+listSpecialite[i]+" to specialites collection");
              });
          }  
          
    
          
        }
      });
};

addRole = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          for(let i =0 ;i<listRole.length;i++)
          {
            new Role({
                name: listRole[i]
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added "+listRole[i]+" to roles collection");
              });
          }  
          
    
          
        }
      });
};  
addGouvernorat= () => {
  Gouvernorat.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        for(let i =0 ;i<listGouvernorat.length;i++)
        {
          new Gouvernorat({
              name: listGouvernorat[i]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("added "+listGouvernorat[i]+" to gouvernorats collection");
            });
        }  
        
  
        
      }
    });
};


const dbs = {
  addSpecialite,
  addRole,
  addGouvernorat
};
module.exports = dbs;


