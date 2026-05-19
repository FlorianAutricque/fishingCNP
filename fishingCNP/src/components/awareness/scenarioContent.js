/**
 * Contenu pédagogique des landing pages de sensibilisation.
 *
 * Chaque scénario fournit :
 *  - `context` : rappel de la situation, affiché en haut de la carte ;
 *  - `sections` : blocs pédagogiques rendus par AwarenessScreen.
 *
 * Variantes de section :
 *  - 'signals' : items { label, points: string[] }   → signaux + réflexe associé
 *  - 'biases'  : items { label, detail }              → liste numérotée
 *  - 'list'    : items string[]                        → liste à puces
 */

const senderSignal = {
  label: "L'adresse de l'expéditeur",
  points: [
    "Le mail venait d'une adresse qui n'était pas celle de Manu dans l'annuaire interne.",
    "Réflexe : vérifie toujours l'adresse mail RÉELLE de l'expéditeur, pas seulement le nom affiché, qui est falsifiable. Sous Outlook, survoler le nom ou cliquer dessus affiche la vraie adresse.",
  ],
}

const loginDomainSignal = {
  label: 'Le domaine de la page de connexion',
  points: [
    "L'URL où tu as saisi tes identifiants n'était ni login.microsoftonline.com, ni un domaine de Concept Nation.",
    'Réflexe : avant de saisir un mot de passe, regarde TOUJOURS l’URL dans la barre d’adresse. Lis-la de droite à gauche : le vrai propriétaire du site est juste avant le .com / .fr. Exemple : sur « concept-microsoft.com », le propriétaire est « concept-microsoft », pas Microsoft.',
  ],
}

const credentialsContext =
  "Tu viens de saisir tes identifiants Microsoft sur une page qui imitait celle de Microsoft. Rassure-toi : rien n'a été enregistré. Mais si ça avait été une vraie attaque, ton compte serait compromis."

const baseReflexes = [
  "Vérifier l'expéditeur réel, pas seulement le nom affiché.",
  "Vérifier l'URL avant toute saisie d'identifiants.",
  "En interne, on est déjà connecté en SSO : si Microsoft demande une reconnexion pour ouvrir un document interne, c'est suspect.",
  "En cas de doute, contacter directement la personne supposée expéditrice par Teams ou téléphone.",
  "Signaler les mails douteux à l'équipe Tech.",
]

export const scenarios = {
  nxlvl: {
    context: credentialsContext,
    sections: [
      {
        title: "Ce qui aurait dû t'alerter dans CE mail",
        variant: 'signals',
        items: [senderSignal, loginDomainSignal],
      },
      {
        title: 'Les bons réflexes',
        variant: 'list',
        items: baseReflexes,
      },
    ],
  },

  rgpd: {
    context: credentialsContext,
    sections: [
      {
        title: "Ce qui aurait dû t'alerter dans CE mail",
        variant: 'signals',
        items: [
          senderSignal,
          loginDomainSignal,
          {
            label: "L'urgence implicite et le levier émotionnel",
            points: [
              'Le mail insistait sur le caractère « primordial » de la charte à lire, valorisait le travail des stagiaires (Loane et Océane) et imposait un délai court (« 10 minutes max »).',
              'Cette combinaison « importance + valorisation d’un tiers + délai » est un schéma classique de social engineering : elle pousse à agir vite sans réfléchir.',
              'Réflexe : quand un mail combine ces leviers, prends 30 secondes pour vérifier avant d’agir.',
            ],
          },
        ],
      },
      {
        title: 'Les bons réflexes',
        variant: 'list',
        items: [
          ...baseReflexes,
          "L'urgence légitime existe rarement par mail. Si c'est vraiment urgent, on appelle.",
        ],
      },
    ],
  },

  cv: {
    context:
      "Tu viens de cliquer sur un lien dans un mail qui semblait venir de Damien. Rassure-toi : ce lien menait juste à cette page de sensibilisation. Mais dans une vraie attaque, ce simple clic aurait pu suffire à compromettre ta machine.",
    sections: [
      {
        title: 'Cliquer suffit déjà à être en danger',
        variant: 'list',
        items: [
          'Un simple clic peut télécharger un malware en arrière-plan (exploit navigateur, drive-by download).',
          "Le clic révèle à l'attaquant ton adresse IP, ton navigateur, ton système d'exploitation et ta géolocalisation approximative.",
          'Pas besoin de saisir un mot de passe pour être compromis : certaines attaques fonctionnent dès la consultation de la page.',
        ],
      },
      {
        title: 'Les biais cognitifs exploités dans CE mail',
        variant: 'biases',
        items: [
          {
            label: "L'autorité",
            detail:
              'Le mail semblait venir d’un dirigeant. On a tendance à répondre vite à une demande hiérarchique.',
          },
          {
            label: "L'affect personnel",
            detail:
              '« Le fils d’un ami proche » crée un lien émotionnel qui baisse la vigilance.',
          },
          {
            label: "L'urgence",
            detail:
              '« Ça presse », « rapide » : l’urgence empêche la réflexion.',
          },
        ],
        footer:
          'Ces trois leviers combinés sont la signature classique du social engineering ciblé.',
      },
      {
        title: 'Les bons réflexes',
        variant: 'list',
        items: [
          "Toujours vérifier l'URL avant de cliquer — la survoler suffit à l'afficher.",
          "Si une demande inhabituelle vient d'un dirigeant, vérifie par un autre canal (Teams, téléphone) avant d'agir.",
          'Méfiance redoublée quand un mail combine autorité + urgence + affect personnel.',
          "Signaler à l'équipe Tech tout mail suspect.",
        ],
      },
    ],
  },
}

export const VALID_SCENARIOS = Object.keys(scenarios)
