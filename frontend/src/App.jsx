import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Music,
  ArrowUp,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  User,
  Mail,
  Users,
  Utensils,
  CheckSquare,
  Bus,
  Heart,
  MessageSquare,
  Info,
  Map,
  PartyPopper
} from 'lucide-react';

// ==========================================
// TRANSLATIONS
// ==========================================
const TRANSLATIONS = {
  en: {
    // Hero
    weddingCelebration: 'Wedding Celebration',
    marriage: 'Marriage: July 1, 2026',
    party: 'Party: July 3, 2026',
    heroLocation: 'Maxims Banquet & Events and Buddha Palace, Kathmandu',
    viewInvitation: 'View Invitation',
    addToCalendar: 'Add to Calendar',
    // Scratch card
    saveTheDate: 'Save The Date',
    revealCelebration: 'Reveal the Celebration',
    scratchDate: 'July 1 & 3, 2026',
    scratchVenue: 'Maxims Banquet & Events and Buddha Palace, Kathmandu',
    // Invitation preview
    formalInvitation: 'Formal Invitation',
    // Welcome section
    sectionWelcomeTitle: '\u0936\u0941\u092d \u0935\u093f\u0935\u093e\u0939',
    sectionWelcomeSubtitle: 'An Auspicious Union',
    welcomeKicker: "With Lord Ganesh's Blessings",
    welcomeHeading: 'Welcome to our Auspicious Day',
    welcomeLead: 'With immense joy, we invite you to celebrate the sacred union of Abishmi and Shesh as two families come together in love, friendship, and lifelong spiritual partnership.',
    welcomeBody: 'Your presence, warmth, and blessings will mean the world to us as we exchange our traditional vows in the beautiful valley of Kathmandu. Please join us in witnessing our union, sharing a grand traditional feast, and celebrating the beginning of our new chapter together.',
    groomParentsLabel: "Groom's Parents",
    brideParentsLabel: "Bride's Parents",
    // Story
    sectionStoryTitle: '\u0939\u093e\u092e\u094d\u0930\u094b \u092a\u094d\u0930\u0947\u092e \u0915\u0925\u093e',
    sectionStorySubtitle: 'Our Love Story',
    ch1Label: 'Chapter One',
    ch1Title: 'The School Function',
    ch1Year: '2010 \u2022 School Function',
    ch1Desc: 'It was back in 2010 during a lively school function when we first crossed paths. A simple introduction sparked a brief connection that stayed with both of us. Though life took us in different directions after school, we kept a quiet connection alive, staying in touch as social media friends and occasionally checking in on each other\u2019s journeys over the years.',
    ch2Label: 'Chapter Two',
    ch2Title: 'The First Date',
    ch2Year: 'July 7, 2023 \u2022 First Date',
    ch2Desc: 'After thirteen years of staying in contact as social media friends, our paths finally converged for our first official date on July 7, 2023. As we sat down and talked, all the years of digital separation vanished. We laughed, shared stories, and instantly realized that the connection we had maintained online was only the prelude to a beautiful real-life love story.',
    ch3Label: 'Chapter Three',
    ch3Title: 'Beginning of Our Forever',
    ch3Year: '2026 \u2022 Heading to the Mandap',
    ch3Desc: 'Following that magical first date, our bond grew stronger with every shared laugh and conversation. Recognizing each other as life partners, and with the loving blessings of our families, we made the decision to unite our lives in marriage. Our journey from school function acquaintances to social media friends, and now to husband and wife, is about to begin.',
    // Itinerary
    sectionItineraryTitle: 'Wedding Itinerary',
    sectionItinerarySubtitle: 'The Ceremonies & Celebrations',
    day1Badge: 'Day 1 \u2022 Marriage',
    day1Title: 'Marriage Ceremony',
    day1Date: 'Wednesday, July 1, 2026',
    day1Time: '11:30 AM Onwards',
    day1TimeReception: '11:00 AM Onwards',
    day1Venue: 'Maxims Banquet & Events, Kathmandu',
    muhurat: 'Muhurat & Varmala',
    kanyadaan: 'Kanyadaan',
    aarti: 'Aarti',
    day1Desc: 'Join us for the sacred marriage ceremony as Abishmi and Shesh begin their life together with family blessings, traditional rituals, and heartfelt celebration.',
    viewVenueMap: 'View Venue Map',
    day2Badge: 'Day 2 \u2022 Party',
    day2Title: 'Wedding Party',
    day2Date: 'Friday, July 3, 2026',
    day2Time: '6:30 PM Onwards',
    day2TimeReception: '5:00 PM Onwards',
    day2Venue: 'Buddha Palace, Kathmandu',
    day2Desc: 'Celebrate with us at the wedding party with dinner, music, dancing, and a joyful evening with family and friends.',
    openInMaps: 'Open in Google Maps',
    // Venue map
    sectionVenueTitle: '\u0939\u093e\u092e\u094d\u0930\u094b \u0938\u094d\u0925\u093e\u0928',
    sectionVenueSubtitle: 'Find the Celebration Venues',
    venueBadgeCeremony: 'Marriage Ceremony',
    venueBadgeReception: 'Reception & Party',
    venue1Title: 'Maxims Banquet & Events',
    venue1Address: 'Marriage Ceremony \u2022 Kathmandu, Nepal',
    venue1Tag: 'July 1 \u2013 Marriage',
    venue2Title: 'Buddha Palace',
    venue2Address: 'Reception & Party \u2022 Kathmandu, Nepal',
    venue2Tag: 'July 3 \u2013 Party',
    venueNotice: 'The marriage ceremony will be held at <strong>Maxims Banquet & Events</strong>, followed by the reception and party at <strong>Buddha Palace</strong>. Shuttle service is available for guests. See the RSVP section to request transportation.',
    // RSVP
    sectionRsvpTitle: 'RSVP',
    sectionRsvpSubtitle: 'Kindly Respond by June 15, 2026',
    yourFullName: 'Your Full Name',
    namePlaceholder: 'E.g., Ram Bahadur',
    emailAddress: 'Email Address',
    emailPlaceholder: 'E.g., ram@gmail.com',
    totalGuests: 'Total Guests in Party',
    dietaryPrefs: 'Dietary Preferences',
    dietaryStandard: 'Standard Traditional Menu',
    dietaryVeg: 'Traditional Nepalese Vegetarian Thali',
    dietaryNonVeg: 'Traditional Nepalese Non-Veg Banquet',
    dietaryVegan: 'Strict Vegan / No Dairy',
    whichEvents: 'Which Events Will You Attend?',
    eventMarriage: 'Marriage Ceremony (July 1, 11:00 AM)',
    eventParty: 'Wedding Party (July 3, 5:00 PM)',
    jantiLabel: 'Janti Shuttle Service',
    jantiText: 'I require Janti shuttle transportation from Central Kathmandu to the venues',
    songLabel: 'Song Suggestion',
    songPlaceholder: 'Suggest a track for the DJ table...',
    blessingsLabel: 'Blessings / Special Notes',
    blessingsPlaceholder: 'Share your blessings or a lovely note...',
    blessingsPlaceholderReception: 'Share a lovely note or dietary allergies details...',
    submitRsvp: 'Submit RSVP',
    sendingRsvp: 'Sending RSVP...',
    successTitle: 'Dhanyabad!',
    successMsg: 'Your RSVP has been submitted. An email draft has been prepared for neupane98088@gmail.com so your response can be sent right away.',
    updateRsvp: 'Update RSVP Details',
    // Footer
    footerQuote: '"\u0905\u0939\u092e\u093e\u0926\u093f\u0930\u094d\u0939\u093f \u0926\u0947\u0935\u093e\u0928\u093e\u0902 \u092e\u0939\u0930\u094d\u0937\u0940\u0923\u093e\u0902 \u091a \u0938\u0930\u094d\u0935\u0936\u0903" \u2022 Two Souls, One Destiny',
    footerBrideGroom: 'Bride & Groom: 9851417703',
    footerMama: 'Mama: 9851310689',
    footerCopy: '\u00a9 2026 Abishmi & Shesh \u2022 Built with Mediterranean Elegance',
  },
  np: {
    // Hero
    weddingCelebration: '\u0935\u093f\u0935\u093e\u0939 \u0909\u0924\u094d\u0938\u0935',
    marriage: '\u0935\u093f\u0935\u093e\u0939: \u0967 \u0938\u093e\u0909\u0928 \u0968\u0966\u0968\u0969',
    party: '\u092a\u093e\u0930\u094d\u091f\u0940: \u0969 \u0938\u093e\u0909\u0928 \u0968\u0966\u0968\u0969',
    heroLocation: '\u092e\u094d\u092f\u093e\u0915\u094d\u0938\u093f\u092e\u094d\u0938 \u092c\u094d\u092f\u093e\u0928\u094d\u0915\u0935\u0947\u091f \u0930 \u092c\u0941\u0926\u094d\u0927 \u092a\u094d\u092f\u093e\u0932\u0947\u0938, \u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902',
    viewInvitation: '\u0928\u093f\u092e\u0928\u094d\u0924\u094d\u0930\u0923\u093e \u0939\u0947\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    addToCalendar: '\u0915\u094d\u092f\u093e\u0932\u0947\u0928\u094d\u0921\u0930\u092e\u093e \u0925\u092a\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    // Scratch card
    saveTheDate: '\u0924\u093e\u0930\u093f\u0916 \u092f\u093e\u0926 \u0930\u093e\u0916\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    revealCelebration: '\u0909\u0924\u094d\u0938\u0935 \u0916\u094b\u0932\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    scratchDate: '\u0967 \u0930 \u0969 \u0938\u093e\u0909\u0928, \u0968\u0966\u0968\u0969',
    scratchVenue: '\u092e\u094d\u092f\u093e\u0915\u094d\u0938\u093f\u092e\u094d\u0938 \u092c\u094d\u092f\u093e\u0928\u094d\u0915\u0935\u0947\u091f \u0930 \u092c\u0941\u0926\u094d\u0927 \u092a\u094d\u092f\u093e\u0932\u0947\u0938, \u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902',
    // Invitation preview
    formalInvitation: '\u0906\u0927\u093f\u0915\u093e\u0930\u093f\u0915 \u0928\u093f\u092e\u0928\u094d\u0924\u094d\u0930\u0923\u093e',
    // Welcome section
    sectionWelcomeTitle: '\u0936\u0941\u092d \u0935\u093f\u0935\u093e\u0939',
    sectionWelcomeSubtitle: '\u090f\u0915 \u0936\u0941\u092d \u092e\u093f\u0932\u0928',
    welcomeKicker: '\u0917\u0923\u0947\u0936\u091c\u0940\u0915\u094b \u0906\u0936\u0940\u0930\u094d\u0935\u093e\u0926\u0938\u0902\u0917',
    welcomeHeading: '\u0939\u093e\u092e\u094d\u0930\u094b \u0936\u0941\u092d \u0926\u093f\u0928\u092e\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u091b',
    welcomeLead: '\u0905\u0924\u094d\u092f\u0928\u094d\u0924 \u0939\u0930\u094d\u0937\u0915\u093e \u0938\u093e\u0925, \u0939\u093e\u092e\u0940 \u0924\u092a\u093e\u0908\u0902\u0932\u093e\u0908 \u0905\u092d\u093f\u0937\u0947\u0915\u0940 \u0930 \u0936\u0947\u0937\u0915\u094b \u092a\u0935\u093f\u0924\u094d\u0930 \u092e\u093f\u0932\u0928\u092e\u093e \u0938\u093e\u0915\u094d\u0937\u0940 \u0939\u0941\u0928 \u0928\u093f\u092e\u0928\u094d\u0924\u094d\u0930\u0923\u093e \u0917\u0930\u094d\u0926\u091b\u094c\u0902\u0964',
    welcomeBody: '\u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902\u0915\u094b \u0938\u0941\u0928\u094d\u0926\u0930 \u0909\u092a\u0924\u094d\u092f\u0915\u093e\u092e\u093e \u0939\u093e\u092e\u0940\u0932\u0947 \u092a\u093e\u0930\u092e\u094d\u092a\u0930\u093f\u0915 \u092a\u094d\u0930\u0924\u093f\u091c\u094d\u091e\u093e \u0917\u0930\u094d\u0926\u093e \u0924\u092a\u093e\u0908\u0902\u0915\u094b \u0909\u092a\u0938\u094d\u0925\u093f\u0924\u093f, \u0909\u0937\u094d\u092e\u093e \u0930 \u0906\u0936\u0940\u0930\u094d\u0935\u093e\u0926\u0932\u0947 \u0939\u093e\u092e\u094d\u0930\u094b \u091c\u0940\u0935\u0928\u092e\u093e \u0905\u0930\u094d\u0925 \u0930\u093e\u0916\u094d\u0928\u0947\u091b\u0964 \u0915\u0943\u092a\u092f\u093e \u0939\u093e\u092e\u094d\u0930\u094b \u092e\u093f\u0932\u0928\u092e\u093e \u0938\u093e\u0915\u094d\u0937\u0940 \u092c\u0928\u094d\u0928\u0941\u0939\u094b\u0938\u094d\u0964',
    groomParentsLabel: '\u0935\u0930\u0915\u093e \u0906\u092e\u093e\u092c\u093e\u092c\u093e',
    brideParentsLabel: '\u0935\u0927\u0942\u0915\u093e \u0906\u092e\u093e\u092c\u093e\u092c\u093e',
    // Story
    sectionStoryTitle: '\u0939\u093e\u092e\u094d\u0930\u094b \u092a\u094d\u0930\u0947\u092e \u0915\u0925\u093e',
    sectionStorySubtitle: '\u0939\u093e\u092e\u094d\u0930\u094b \u092a\u094d\u0930\u0947\u092e\u0915\u094b \u092f\u093e\u0924\u094d\u0930\u093e',
    ch1Label: '\u092a\u094d\u0930\u0925\u092e \u0905\u0927\u094d\u092f\u093e\u092f',
    ch1Title: '\u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f\u0915\u094b \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e',
    ch1Year: '\u0968\u0966\u0967\u0966 \u2022 \u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e',
    ch1Desc: '\u0968\u0966\u0967\u0966 \u092e\u093e \u090f\u0909\u091f\u093e \u091a\u0939\u0932\u092a\u0939\u0932\u0915\u094b \u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e\u092e\u093e \u0939\u093e\u092e\u0940 \u092a\u0939\u093f\u0932\u094b \u092a\u091f\u0915 \u092d\u0947\u091f\u093f\u090f\u0964 \u090f\u0909\u091f\u093e \u0938\u093e\u0927\u093e\u0930\u0923 \u092a\u0930\u093f\u091a\u092f\u0932\u0947 \u090f\u0909\u091f\u093e \u0938\u0902\u0915\u094d\u0937\u093f\u092a\u094d\u0924 \u0938\u0902\u092c\u0928\u094d\u0927 \u091c\u0928\u094d\u092e\u093e\u092f\u094b \u091c\u0941\u0928 \u0939\u093e\u092e\u0940 \u0926\u0941\u0935\u0948\u092e\u093e \u092c\u0938\u093f\u0930\u0939\u094d\u092f\u094b\u0964 \u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f\u092a\u091b\u093f \u091c\u0940\u0935\u0928 \u0905\u0932\u0917\u0905\u0932\u0917 \u092e\u094b\u0921\u092e\u093e \u0917\u090f \u0924\u0930 \u0938\u093e\u092e\u093e\u091c\u093f\u0915 \u092e\u093f\u0921\u093f\u092f\u093e\u092e\u093e \u092e\u093f\u0924\u094d\u0930\u0915\u094b \u0930\u0942\u092a\u092e\u093e \u0938\u092e\u094d\u092a\u0930\u094d\u0915 \u0930\u093e\u0916\u094d\u092f\u094c\u0902\u0964',
    ch2Label: '\u0926\u094b\u0938\u094d\u0930\u094b \u0905\u0927\u094d\u092f\u093e\u092f',
    ch2Title: '\u092a\u0939\u093f\u0932\u094b \u092d\u0947\u091f',
    ch2Year: '\u0967 \u0938\u093e\u0909\u0928 \u0968\u0966\u0968\u0969 \u2022 \u092a\u0939\u093f\u0932\u094b \u092d\u0947\u091f',
    ch2Desc: '\u0924\u0947\u0930\u0939 \u0935\u0930\u094d\u0937\u0938\u092e\u094d\u092e \u0938\u093e\u092e\u093e\u091c\u093f\u0915 \u092e\u093f\u0921\u093f\u092f\u093e\u092e\u093e \u092e\u093f\u0924\u094d\u0930\u0915\u094b \u0930\u0942\u092a\u092e\u093e \u0938\u092e\u094d\u092a\u0930\u094d\u0915 \u0930\u093e\u0916\u0947\u092a\u091b\u093f \u0939\u093e\u092e\u094d\u0930\u094b \u092e\u093e\u0930\u094d\u0917 \u0967 \u0938\u093e\u0909\u0928 \u0968\u0966\u0968\u0969 \u092e\u093e \u092a\u0939\u093f\u0932\u094b \u092d\u0947\u091f\u092e\u093e \u092e\u093f\u0932\u093f\u092f\u094b\u0964 \u0939\u093e\u092e\u0940 \u092c\u0938\u0947\u0930 \u0915\u0941\u0930\u093e \u0917\u0930\u094d\u0926\u093e \u0935\u0930\u094d\u0937\u094c\u0902\u0915\u094b \u0926\u093f\u0917\u093f \u0935\u093f\u091b\u094b\u0921 \u0939\u0930\u093e\u092f\u094b\u0964 \u0939\u093e\u092e\u0940 \u0939\u093e\u0938\u094d\u092f\u094c\u0902, \u0915\u0941\u0930\u093e\u0915\u093e\u0928\u0940 \u0917\u0930\u094d\u092f\u094c\u0902 \u0930 \u092e\u0939\u0938\u0941\u0938 \u0917\u0930\u094d\u092f\u094c\u0902 \u0915\u093f \u092f\u094b \u0938\u092e\u094d\u092c\u0928\u094d\u0927 \u0935\u093e\u0938\u094d\u0924\u0935\u093f\u0915 \u091c\u0940\u0935\u0928\u0915\u094b \u092a\u094d\u0930\u0947\u092e\u0915\u0925\u093e\u0915\u094b \u092a\u094d\u0930\u0938\u094d\u0924\u093e\u0935\u0928\u093e \u092e\u093e\u0924\u094d\u0930 \u0925\u093f\u092f\u094b\u0964',
    ch3Label: '\u0924\u0947\u0938\u094d\u0930\u094b \u0905\u0927\u094d\u092f\u093e\u092f',
    ch3Title: '\u0939\u093e\u092e\u094d\u0930\u094b \u091c\u0940\u0935\u0928\u0915\u094b \u0936\u0941\u0930\u0941',
    ch3Year: '\u0968\u0966\u0968\u0969 \u2022 \u092e\u0923\u094d\u0921\u092a\u0924\u0930\u092b \u091c\u093e\u0926\u0948',
    ch3Desc: '\u0924\u094d\u092f\u094b \u091c\u093e\u0926\u0941\u0908 \u092a\u0939\u093f\u0932\u094b \u092d\u0947\u091f\u092a\u091b\u093f, \u0939\u093e\u092e\u094d\u0930\u094b \u092c\u0928\u094d\u0927\u0928 \u092a\u094d\u0930\u0924\u094d\u092f\u0947\u0915 \u0939\u093e\u0938\u094d\u092f\u0948 \u0930 \u0915\u0941\u0930\u093e\u0915\u093e\u0928\u0940\u0938\u0902\u0917 \u0917\u0939\u093f\u0930\u093f\u0928\u094d\u0926\u094b \u0917\u092f\u094b\u0964 \u090f\u0915\u0905\u0930\u094d\u0915\u093e\u0932\u093e\u0908 \u091c\u0940\u0935\u0928\u0938\u093e\u0925\u0940 \u092e\u093e\u0928\u094d\u0926\u0948 \u0930 \u092a\u0930\u093f\u0935\u093e\u0930\u0915\u094b \u0906\u0936\u0940\u0930\u094d\u0935\u093e\u0926\u0938\u0902\u0917 \u0935\u093f\u0935\u093e\u0939 \u0917\u0930\u094d\u0928\u0947 \u0928\u093f\u0930\u094d\u0923\u092f \u0917\u0930\u094d\u092f\u094c\u0902\u0964',
    // Itinerary
    sectionItineraryTitle: '\u0935\u093f\u0935\u093e\u0939 \u0915\u093e\u0930\u094d\u092f\u0924\u093e\u0932\u093f\u0915\u093e',
    sectionItinerarySubtitle: '\u0935\u093f\u0927\u093f\u0939\u0930\u0942 \u0930 \u0909\u0924\u094d\u0938\u0935\u0939\u0930\u0942',
    day1Badge: '\u092a\u0939\u093f\u0932\u094b \u0926\u093f\u0928 \u2022 \u0935\u093f\u0935\u093e\u0939',
    day1Title: '\u0935\u093f\u0935\u093e\u0939 \u0938\u092e\u093e\u0930\u094b\u0939',
    day1Date: '\u092c\u0941\u0927\u0935\u093e\u0930, \u0967 \u0938\u093e\u0909\u0928 \u0968\u0966\u0968\u0969',
    day1Time: '\u0967\u0967:\u0969\u0966 \u092c\u091c\u0947\u0926\u0947\u0916\u093f',
    day1TimeReception: '\u0967\u0967:\u0966\u0966 \u092c\u091c\u0947\u0926\u0947\u0916\u093f',
    day1Venue: '\u092e\u094d\u092f\u093e\u0915\u094d\u0938\u093f\u092e\u094d\u0938 \u092c\u094d\u092f\u093e\u0928\u094d\u0915\u0935\u0947\u091f, \u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902',
    muhurat: '\u092e\u0941\u0939\u0942\u0930\u094d\u0924 \u0930 \u0935\u0930\u092e\u093e\u0932\u093e',
    kanyadaan: '\u0915\u0928\u094d\u092f\u093e\u0926\u093e\u0928',
    aarti: '\u0906\u0930\u0924\u0940',
    day1Desc: '\u0905\u092d\u093f\u0937\u0947\u0915\u0940 \u0930 \u0936\u0947\u0937\u0932\u0947 \u092a\u0930\u093f\u0935\u093e\u0930\u0915\u094b \u0906\u0936\u0940\u0930\u094d\u0935\u093e\u0926, \u092a\u0930\u092e\u094d\u092a\u0930\u093e\u0917\u0924 \u0935\u093f\u0927\u093f \u0930 \u0939\u0930\u094d\u0926\u093f\u0915 \u0909\u0924\u094d\u0938\u0935\u0938\u0902\u0917 \u0935\u093f\u0935\u093e\u0939 \u0938\u092e\u093e\u0930\u094b\u0939\u092e\u093e \u0938\u093e\u092e\u0947\u0932 \u0939\u0941\u0928\u0941\u0939\u094b\u0938\u094d\u0964',
    viewVenueMap: '\u0938\u094d\u0925\u093e\u0928\u0915\u094b \u0928\u0915\u094d\u0938\u093e \u0939\u0947\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    day2Badge: '\u0926\u094b\u0938\u094d\u0930\u094b \u0926\u093f\u0928 \u2022 \u092a\u093e\u0930\u094d\u091f\u0940',
    day2Title: '\u0935\u093f\u0935\u093e\u0939 \u092a\u093e\u0930\u094d\u091f\u0940',
    day2Date: '\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930, \u0969 \u0938\u093e\u0909\u0928 \u0968\u0966\u0968\u0969',
    day2Time: '\u0969:\u0969\u0966 \u092c\u091c\u0947\u0926\u0947\u0916\u093f',
    day2TimeReception: '\u0968:\u0966\u0966 \u092c\u091c\u0947\u0926\u0947\u0916\u093f',
    day2Venue: '\u092c\u0941\u0926\u094d\u0927 \u092a\u094d\u092f\u093e\u0932\u0947\u0938, \u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902',
    day2Desc: '\u0930\u093e\u0924\u094d\u0930\u093f\u092d\u094b\u091c, \u0938\u0902\u0917\u0940\u0924, \u0928\u093e\u091a \u0930 \u092a\u0930\u093f\u0935\u093e\u0930 \u0924\u0925\u093e \u092e\u093f\u0924\u094d\u0930\u0939\u0930\u0942\u0938\u0902\u0917 \u0906\u0928\u0928\u094d\u0926\u092e\u092f \u0938\u093e\u0901\u091d\u0938\u0902\u0917 \u0935\u093f\u0935\u093e\u0939 \u092a\u093e\u0930\u094d\u091f\u0940\u092e\u093e \u0939\u093e\u092e\u0940\u0938\u0902\u0917 \u0909\u0924\u094d\u0938\u0935 \u092e\u0928\u093e\u0909\u0928\u0941\u0939\u094b\u0938\u094d\u0964',
    openInMaps: '\u0917\u0942\u0917\u0932 \u092e\u094d\u092f\u093e\u092a\u092e\u093e \u0916\u094b\u0932\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    // Venue map
    sectionVenueTitle: '\u0939\u093e\u092e\u094d\u0930\u094b \u0938\u094d\u0925\u093e\u0928',
    sectionVenueSubtitle: '\u0909\u0924\u094d\u0938\u0935\u0915\u094b \u0938\u094d\u0925\u093e\u0928 \u092b\u0947\u0932\u093e \u092a\u093e\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    venueBadgeCeremony: '\u0935\u093f\u0935\u093e\u0939 \u0938\u092e\u093e\u0930\u094b\u0939',
    venueBadgeReception: '\u0930\u093f\u0938\u0947\u092a\u094d\u0938\u0928 \u0930 \u092a\u093e\u0930\u094d\u091f\u0940',
    venue1Title: '\u092e\u094d\u092f\u093e\u0915\u094d\u0938\u093f\u092e\u094d\u0938 \u092c\u094d\u092f\u093e\u0928\u094d\u0915\u0935\u0947\u091f',
    venue1Address: '\u0935\u093f\u0935\u093e\u0939 \u0938\u092e\u093e\u0930\u094b\u0939 \u2022 \u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902, \u0928\u0947\u092a\u093e\u0932',
    venue1Tag: '\u0967 \u0938\u093e\u0909\u0928 \u2013 \u0935\u093f\u0935\u093e\u0939',
    venue2Title: '\u092c\u0941\u0926\u094d\u0927 \u092a\u094d\u092f\u093e\u0932\u0947\u0938',
    venue2Address: '\u0930\u093f\u0938\u0947\u092a\u094d\u0938\u0928 \u0930 \u092a\u093e\u0930\u094d\u091f\u0940 \u2022 \u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902, \u0928\u0947\u092a\u093e\u0932',
    venue2Tag: '\u0969 \u0938\u093e\u0909\u0928 \u2013 \u092a\u093e\u0930\u094d\u091f\u0940',
    venueNotice: '\u0935\u093f\u0935\u093e\u0939 \u0938\u092e\u093e\u0930\u094b\u0939 <strong>\u092e\u094d\u092f\u093e\u0915\u094d\u0938\u093f\u092e\u094d\u0938 \u092c\u094d\u092f\u093e\u0928\u094d\u0915\u0935\u0947\u091f</strong>\u092e\u093e \u0939\u0941\u0928\u0947\u091b \u0930 \u0930\u093f\u0938\u0947\u092a\u094d\u0938\u0928 \u092a\u093e\u0930\u094d\u091f\u0940 <strong>\u092c\u0941\u0926\u094d\u0927 \u092a\u094d\u092f\u093e\u0932\u0947\u0938</strong>\u092e\u093e\u0964 \u0905\u0924\u093f\u0925\u093f\u0939\u0930\u0942\u0915\u093e \u0932\u093e\u0917\u093f \u0936\u091f\u0932 \u0938\u0947\u0935\u093e \u0909\u092a\u0932\u092c\u094d\u0927 \u091b\u0964',
    // RSVP
    sectionRsvpTitle: 'RSVP',
    sectionRsvpSubtitle: '\u0967\u0968 \u091c\u0947\u0920 \u0968\u0966\u0968\u0969 \u0938\u092e\u094d\u092e \u091c\u0935\u093e\u092b \u0926\u093f\u0928\u0941\u0939\u094b\u0938\u094d',
    yourFullName: '\u0924\u092a\u093e\u0908\u0902\u0915\u094b \u092a\u0942\u0930\u093e \u0928\u093e\u092e',
    namePlaceholder: '\u0909\u0926\u093e.: \u0930\u093e\u092e \u092c\u0939\u093e\u0926\u0941\u0930',
    emailAddress: '\u0907\u092e\u0947\u0932 \u0920\u0947\u0917\u093e\u0928\u093e',
    emailPlaceholder: '\u0909\u0926\u093e.: ram@gmail.com',
    totalGuests: '\u0915\u0941\u0932 \u0905\u0924\u093f\u0925\u093f \u0938\u0902\u0916\u094d\u092f\u093e',
    dietaryPrefs: '\u0916\u093e\u0928\u093e\u092a\u093f\u0928\u093e \u0930\u0942\u091a\u093f',
    dietaryStandard: '\u092a\u093e\u0930\u092e\u094d\u092a\u0930\u093f\u0915 \u0938\u093e\u0927\u093e\u0930\u0923 \u092e\u0947\u0928\u0941',
    dietaryVeg: '\u0928\u0947\u092a\u093e\u0932\u0940 \u0936\u093e\u0915\u093e\u0939\u093e\u0930\u0940 \u0925\u093e\u0932\u0940',
    dietaryNonVeg: '\u0928\u0947\u092a\u093e\u0932\u0940 \u092e\u093e\u0902\u0938\u093e\u0939\u093e\u0930\u0940 \u092d\u094b\u091c',
    dietaryVegan: '\u0915\u0921\u093e \u0936\u093e\u0915\u093e\u0939\u093e\u0930\u0940 / \u0921\u0947\u0930\u0940 \u0928\u091a\u093e\u0939\u093f\u0928\u0947',
    whichEvents: '\u0915\u0941\u0928 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e\u092e\u093e \u0906\u0909\u0928\u0941\u0939\u0941\u0928\u094d\u091b?',
    eventMarriage: '\u0935\u093f\u0935\u093e\u0939 \u0938\u092e\u093e\u0930\u094b\u0939 (\u0967 \u0938\u093e\u0909\u0928, \u0967\u0967:\u0966\u0966 \u092c\u091c\u0947)',
    eventParty: '\u0935\u093f\u0935\u093e\u0939 \u092a\u093e\u0930\u094d\u091f\u0940 (\u0969 \u0938\u093e\u0909\u0928, \u0968:\u0966\u0966 \u092c\u091c\u0947)',
    jantiLabel: '\u091c\u093e\u0928\u094d\u0924\u0940 \u0936\u091f\u0932 \u0938\u0947\u0935\u093e',
    jantiText: '\u092e\u0932\u093e\u0908 \u0915\u0947\u0928\u094d\u0926\u094d\u0930\u0940\u092f \u0915\u093e\u0920\u092e\u093e\u0921\u094c\u0902\u0926\u0947\u0916\u093f \u0938\u094d\u0925\u0932\u0939\u0930\u0942\u0938\u092e\u094d\u092e \u091c\u093e\u0928\u094d\u0924\u0940 \u0936\u091f\u0932 \u091a\u093e\u0939\u093f\u090f\u0914\u0932',
    songLabel: '\u0917\u093e\u0928\u093e \u0938\u0941\u091d\u093e\u0935',
    songPlaceholder: '\u0921\u093f\u091c\u0947 \u0924\u093e\u0932\u093f\u0915\u093e\u0915\u093e \u0932\u093e\u0917\u093f \u0917\u093e\u0928\u093e \u0938\u0941\u091d\u093e\u0909\u0928\u0941\u0939\u094b\u0938\u094d...',
    blessingsLabel: '\u0906\u0936\u0940\u0930\u094d\u0935\u093e\u0926 / \u0935\u093f\u0936\u0947\u0937 \u091f\u093f\u092a\u094d\u092a\u0923\u0940',
    blessingsPlaceholder: '\u0906\u0936\u0940\u0930\u094d\u0935\u093e\u0926 \u0926\u093f\u0928\u0941\u0939\u094b\u0938\u094d \u0935\u093e \u0938\u0941\u0928\u094d\u0926\u0930 \u0938\u0928\u094d\u0926\u0947\u0936 \u0932\u0947\u0916\u094d\u0928\u0941\u0939\u094b\u0938\u094d...',
    blessingsPlaceholderReception: '\u0938\u0941\u0928\u094d\u0926\u0930 \u0938\u0928\u094d\u0926\u0947\u0936 \u0935\u093e \u0916\u093e\u0928\u093e\u092a\u093f\u0928\u093e \u090f\u0932\u0930\u094d\u091c\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u0926\u093f\u0928\u0941\u0939\u094b\u0938\u094d...',
    submitRsvp: 'RSVP \u092a\u0920\u093e\u0909\u0928\u0941\u0939\u094b\u0938\u094d',
    sendingRsvp: 'RSVP \u092a\u0920\u093e\u0907\u0901\u0926\u0948...',
    successTitle: '\u0927\u0928\u094d\u092f\u092c\u093e\u0926!',
    successMsg: '\u0924\u092a\u093e\u0908\u0902\u0915\u094b RSVP \u092a\u0920\u093e\u0907\u092f\u094b\u0964 neupane98088@gmail.com \u092e\u093e \u0907\u092e\u0947\u0932 \u0924\u092f\u093e\u0930 \u092a\u093e\u0930\u093f\u090f\u0915\u094b \u091b\u0964',
    updateRsvp: 'RSVP \u0935\u093f\u0935\u0930\u0923 \u0905\u092a\u0921\u0947\u091f \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    // Footer
    footerQuote: '"\u0905\u0939\u092e\u093e\u0926\u093f\u0930\u094d\u0939\u093f \u0926\u0947\u0935\u093e\u0928\u093e\u0902 \u092e\u0939\u0930\u094d\u0937\u0940\u0923\u093e\u0902 \u091a \u0938\u0930\u094d\u0935\u0936\u0903" \u2022 \u0926\u0941\u0908 \u0906\u0924\u094d\u092e\u093e, \u090f\u0915 \u092d\u093e\u0917\u094d\u092f',
    footerBrideGroom: '\u0935\u0930\u0935\u0927\u0942: 9851417703',
    footerMama: '\u092e\u093e\u092e\u093e: 9851310689',
    footerCopy: '\u00a9 2026 \u0905\u092d\u093f\u0937\u0947\u0915\u0940 \u0930 \u0936\u0947\u0937 \u2022 \u092e\u0947\u0921\u093f\u091f\u0947\u0930\u0947\u0928\u093f\u092f\u0928 \u0938\u0941\u0928\u094d\u0926\u0930\u0924\u093e\u0938\u0902\u0917 \u0928\u093f\u0930\u094d\u092e\u093f\u0924',
  }
};

// ==========================================
// 1. MARIGOLD & SPARKS CANVAS COMPONENT
// ==========================================
const MarigoldParticles = ({ rsvpSuccess }) => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const particlesRef = useRef({ petals: [], sparks: [] });
  const prevRsvpSuccessRef = useRef(rsvpSuccess);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Petal class simulation
    class MarigoldPetal {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -60 - 20;
        this.size = 5 + Math.random() * 7;
        this.speedY = 0.8 + Math.random() * 1.2;
        this.speedX = Math.sin(Math.random()) * 0.4;
        this.angle = Math.random() * 360;
        this.spinSpeed = 0.4 + Math.random() * 0.8;
        const colors = ['#ff9f1c', '#ffbf00', '#ffd166', '#ff8c00', '#ff4500'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0.5 + Math.random() * 0.5;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 25) * 0.4;
        this.angle += this.spinSpeed;
        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }
      draw(cCtx) {
        cCtx.save();
        cCtx.translate(this.x, this.y);
        cCtx.rotate((this.angle * Math.PI) / 180);
        cCtx.fillStyle = this.color;
        cCtx.globalAlpha = this.opacity;
        cCtx.beginPath();
        cCtx.moveTo(0, 0);
        cCtx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size);
        cCtx.quadraticCurveTo(this.size / 2, -this.size / 2, 0, 0);
        cCtx.fill();
        cCtx.restore();
      }
    }

    // Spark Particle class simulation
    class SparkParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 4.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.2;
        this.gravity = 0.07;
        this.alpha = 1.0;
        this.decay = 0.014 + Math.random() * 0.018;
        this.size = 3 + Math.random() * 5;
        const colors = ['#c5a059', '#e0c38c', '#1b2e3c', '#ff9f1c', '#9e2a2b'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.isHeart = Math.random() < 0.35;
      }
      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }
      draw(cCtx) {
        if (this.alpha <= 0) return;
        cCtx.save();
        cCtx.globalAlpha = this.alpha;
        cCtx.fillStyle = this.color;
        if (this.isHeart) {
          cCtx.beginPath();
          const d = this.size;
          cCtx.moveTo(this.x, this.y + d / 4);
          cCtx.quadraticCurveTo(this.x, this.y, this.x - d / 2, this.y);
          cCtx.quadraticCurveTo(this.x - d, this.y, this.x - d, this.y + d / 2);
          cCtx.quadraticCurveTo(this.x - d, this.y + d, this.x, this.y + d * 1.5);
          cCtx.quadraticCurveTo(this.x + d, this.y + d, this.x + d, this.y + d / 2);
          cCtx.quadraticCurveTo(this.x + d, this.y, this.x + d / 2, this.y);
          cCtx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
          cCtx.fill();
        } else {
          cCtx.beginPath();
          cCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
          cCtx.fill();
        }
        cCtx.restore();
      }
    }

    // Initialize petals
    const maxPetals = window.innerWidth < 768 ? 18 : 36;
    const tempPetals = [];
    for (let i = 0; i < maxPetals; i++) {
      tempPetals.push(new MarigoldPetal());
    }
    particlesRef.current.petals = tempPetals;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw petals
      particlesRef.current.petals.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Draw active sparks
      for (let i = particlesRef.current.sparks.length - 1; i >= 0; i--) {
        const sp = particlesRef.current.sparks[i];
        sp.update();
        sp.draw(ctx);
        if (sp.alpha <= 0) {
          particlesRef.current.sparks.splice(i, 1);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  // Listen for rsvpSuccess triggers to spawn explosions
  useEffect(() => {
    if (rsvpSuccess && !prevRsvpSuccessRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const sx = canvas.width / 2;
        const sy = canvas.height / 2;
        const tempSparks = [];
        // Spawn 100 spark particles
        for (let i = 0; i < 100; i++) {
          // Import SparkParticle internally or reference class
          class SparkParticle {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              const angle = Math.random() * Math.PI * 2;
              const speed = 1.8 + Math.random() * 4.5;
              this.vx = Math.cos(angle) * speed;
              this.vy = Math.sin(angle) * speed - 1.2;
              this.gravity = 0.07;
              this.alpha = 1.0;
              this.decay = 0.014 + Math.random() * 0.018;
              this.size = 3 + Math.random() * 5;
              const colors = ['#c5a059', '#e0c38c', '#1b2e3c', '#ff9f1c', '#9e2a2b'];
              this.color = colors[Math.floor(Math.random() * colors.length)];
              this.isHeart = Math.random() < 0.35;
            }
            update() {
              this.vy += this.gravity;
              this.x += this.vx;
              this.y += this.vy;
              this.alpha -= this.decay;
            }
            draw(cCtx) {
              if (this.alpha <= 0) return;
              cCtx.save();
              cCtx.globalAlpha = this.alpha;
              cCtx.fillStyle = this.color;
              if (this.isHeart) {
                cCtx.beginPath();
                const d = this.size;
                cCtx.moveTo(this.x, this.y + d / 4);
                cCtx.quadraticCurveTo(this.x, this.y, this.x - d / 2, this.y);
                cCtx.quadraticCurveTo(this.x - d, this.y, this.x - d, this.y + d / 2);
                cCtx.quadraticCurveTo(this.x - d, this.y + d, this.x, this.y + d * 1.5);
                cCtx.quadraticCurveTo(this.x + d, this.y + d, this.x + d, this.y + d / 2);
                cCtx.quadraticCurveTo(this.x + d, this.y, this.x + d / 2, this.y);
                cCtx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
                cCtx.fill();
              } else {
                cCtx.beginPath();
                cCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                cCtx.fill();
              }
              cCtx.restore();
            }
          }
          tempSparks.push(new SparkParticle(sx, sy));
        }
        particlesRef.current.sparks = tempSparks;
      }
    }
    prevRsvpSuccessRef.current = rsvpSuccess;
  }, [rsvpSuccess]);

  return <canvas ref={canvasRef} className="canvas-particles" id="particles-canvas" />;
};

// ==========================================
// 2. SCRATCH CARD COMPONENT
// ==========================================
const ScratchCard = ({ isVisible }) => {
  const canvasRef = useRef(null);
  const [isFadedOut, setIsFadedOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const isScratchingRef = useRef(false);
  const canvasDrawnRef = useRef(false);

  useEffect(() => {
    if (!isVisible || canvasDrawnRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set proper canvas size matching bounds
    const rect = canvas.parentNode.getBoundingClientRect();
    const w = rect.width > 0 ? rect.width : 390;
    const h = rect.height > 0 ? rect.height : 156;
    canvas.width = w;
    canvas.height = h;

    // Draw Elegant Gold foil layer
    const goldGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    goldGrad.addColorStop(0, '#c5a059');
    goldGrad.addColorStop(0.5, '#e0c38c');
    goldGrad.addColorStop(1, '#ae843b');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sophisticated traditional Mandala circle outlines on the scratch layer
    ctx.strokeStyle = 'rgba(64, 48, 16, 0.2)';
    ctx.lineWidth = 1;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 15, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      ctx.moveTo(cx + Math.cos(angle) * 15, cy + Math.sin(angle) * 15);
      ctx.lineTo(cx + Math.cos(angle) * 60, cy + Math.sin(angle) * 60);
    }
    ctx.stroke();

    ctx.fillStyle = '#4e3502';
    ctx.textAlign = 'center';
    ctx.font = "600 10px 'Montserrat'";
    ctx.fillText("SCRATCH TO REVEAL", cx, cy - 34);
    ctx.font = "italic 18px 'Cormorant Garamond'";
    ctx.fillText("Abishmi & Shesh", cx, cy + 6);
    ctx.font = "600 10px 'Montserrat'";
    ctx.fillText("JULY 2026", cx, cy + 40);

    canvasDrawnRef.current = true;

    // Scratch logic
    const getMousePos = (e) => {
      const cRect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - cRect.left,
        y: clientY - cRect.top
      };
    };

    const checkScratchPercentage = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparent = 0;
      const step = 30;
      let totalSamples = 0;

      for (let i = 3; i < pixels.length; i += 4 * step) {
        totalSamples++;
        if (pixels[i] === 0) {
          transparent++;
        }
      }

      const percentage = transparent / totalSamples;
      if (percentage > 0.45) {
        setIsFadedOut(true);
        setTimeout(() => {
          setIsHidden(true);
        }, 600);
      }
    };

    const scratch = (e) => {
      if (!isScratchingRef.current) return;
      e.preventDefault();
      const pos = getMousePos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fill();
      checkScratchPercentage();
    };

    const startScratch = (e) => {
      isScratchingRef.current = true;
      scratch(e);
    };

    const endScratch = () => {
      isScratchingRef.current = false;
    };

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', endScratch);

    canvas.addEventListener('touchstart', startScratch);
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', endScratch);

    return () => {
      window.removeEventListener('mouseup', endScratch);
      window.removeEventListener('touchend', endScratch);
    };
  }, [isVisible]);

  if (isHidden) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`scratch-canvas ${isFadedOut ? 'fade-out' : ''}`}
        id="scratch-canvas-el"
      />
      <div
        className="scratch-instruction-overlay"
        id="scratch-hint"
        style={{ opacity: isFadedOut ? 0 : 1 }}
      >
        Scratch to discover the date
      </div>
    </>
  );
};

// ==========================================
// 3. MAIN APP COMPONENT
// ==========================================
export default function App() {
  // Mode detection: Wedding vs Reception
  const [isReception, setIsReception] = useState(false);
  // Language toggle
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const checkMode = () => {
      const pathname = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const inviteType = searchParams.get('type') || searchParams.get('invite');

      const isRec = pathname.includes('reception') || inviteType === 'reception';
      setIsReception(isRec);
    };

    checkMode();
    // Watch for popstate/url changes (supports simple client router)
    window.addEventListener('popstate', checkMode);
    return () => window.removeEventListener('popstate', checkMode);
  }, []);

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [envelopeAnimationDone, setEnvelopeAnimationDone] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpFormState, setRsvpFormState] = useState({
    fullname: '',
    email: '',
    party_size: '1',
    dietary: 'none',
    event_swayambar: true,
    event_reception: true,
    janti_transport: false,
    song_suggestion: '',
    notes: ''
  });
  const [isSendingRsvp, setIsSendingRsvp] = useState(false);

  const audioRef = useRef(null);

  // Back to top observer
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check LocalStorage cache for RSVP on mount or when mode changes
  useEffect(() => {
    const cachedRsvp = localStorage.getItem(`abishmi_shesh_rsvp_${isReception ? 'reception' : 'wedding'}`);
    if (cachedRsvp) {
      try {
        const data = JSON.parse(cachedRsvp);
        setRsvpFormState((prev) => ({ ...prev, ...data }));
        setRsvpSuccess(true);
      } catch (err) {
        console.error("Failed to parse cached RSVP:", err);
      }
    } else {
      setRsvpSuccess(false);
      // Reset form fields
      setRsvpFormState({
        fullname: '',
        email: '',
        party_size: '1',
        dietary: 'none',
        event_swayambar: true,
        event_reception: true,
        janti_transport: false,
        song_suggestion: '',
        notes: ''
      });
    }
  }, [isReception]);

  // Handle music toggle
  const toggleMusic = (forceValue = null) => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPlay = forceValue !== null ? forceValue : !musicPlaying;
    if (shouldPlay) {
      audio.play()
        .then(() => setMusicPlaying(true))
        .catch((err) => console.log("Audio play blocked by browser policies:", err));
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  const handleOpenEnvelope = () => {
    if (envelopeOpen) return;
    setEnvelopeOpen(true);
    toggleMusic(true);

    setTimeout(() => {
      setEnvelopeAnimationDone(true);
    }, 1250);
  };

  const handleAddToCalendar = () => {
    const summary = "Abishmi & Shesh's Wedding Ceremonies";
    const details = isReception
      ? "Together with their families, Mrs. and Mr. Neupane and Mrs. and Mr. Shah request the pleasure of your company to celebrate the wedding of Abishmi and Shesh. Marriage ceremony: July 1. Reception Party: July 3."
      : "Together with their families, Ms. Sirana Neupane, Mr. Kamal Kumar Neupane, Ms. Saradha Devi Shah, and Mr. Nawashi Shah request the pleasure of your company to celebrate the wedding of Abishmi and Shesh. Marriage ceremony: July 1 at 11:30 AM. Reception Party: July 3 at 6:30 PM.";
    const location = "Maxims Banquet & Events and Buddha Palace, Kathmandu, Nepal";
    const startStr = "20260701T054500Z"; // July 1, 2026 11:30 AM NPT in UTC
    const endStr = "20260703T124500Z";   // July 3, 2026 6:30 PM NPT in UTC

    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(calUrl, '_blank');
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpFormState.fullname.trim()) {
      alert("Please fill in your full name.");
      return;
    }

    setIsSendingRsvp(true);

    const payload = isReception
      ? {
        fullname: rsvpFormState.fullname,
        email: rsvpFormState.email,
        party_size: rsvpFormState.party_size,
        dietary: rsvpFormState.dietary,
        event_swayambar: rsvpFormState.event_swayambar ? 'yes' : 'no',
        event_reception: rsvpFormState.event_reception ? 'yes' : 'no',
        janti_transport: rsvpFormState.janti_transport ? 'yes' : 'no',
        song_suggestion: rsvpFormState.song_suggestion,
        notes: rsvpFormState.notes,
        mode: 'reception'
      }
      : {
        fullname: rsvpFormState.fullname,
        notes: rsvpFormState.notes,
        mode: 'wedding'
      };

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Unable to submit RSVP.');
      }

      // Save to local storage cache
      localStorage.setItem(
        `abishmi_shesh_rsvp_${isReception ? 'reception' : 'wedding'}`,
        JSON.stringify(rsvpFormState)
      );

      setRsvpSuccess(true);
    } catch (err) {
      alert(err.message || 'Something went wrong while sending RSVP. Please try again.');
    } finally {
      setIsSendingRsvp(false);
    }
  };

  const handleResetRsvp = () => {
    localStorage.removeItem(`abishmi_shesh_rsvp_${isReception ? 'reception' : 'wedding'}`);
    setRsvpSuccess(false);
  };

  // Scroll Reveal hook using classes and state instead of IntersectionObserver if desired, 
  // but let's implement standard scroll reveal classes using a tiny effect
  useEffect(() => {
    if (!envelopeAnimationDone) return;
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [envelopeAnimationDone, isReception]);

  // Lock scrolling during envelope screen
  useEffect(() => {
    if (!envelopeAnimationDone) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [envelopeAnimationDone]);

  // Parent names copy variables
  const groomParents = isReception
    ? "Mrs. & Mr. Shah"
    : "Ms. Sharada Devi Shah & Mr. Nawashi Shah";

  const brideParents = isReception
    ? "Mrs. & Mr. Neupane"
    : "Ms. Srijana Neupane & Mr. Kamal Kumar Neupane";
  return (
    <>
      {/* 1. Sayapatri Particles */}
      <MarigoldParticles rsvpSuccess={rsvpSuccess} />

      {/* 2. Envelope Preloader */}
      {!envelopeAnimationDone && (
        <div
          id="envelope-screen"
          className={envelopeOpen ? 'open' : ''}
          onClick={handleOpenEnvelope}
        >
          <img
            className="envelope-fullscreen-image"
            src="/assets/images/envelop.jpg"
            alt="Wedding invitation envelope"
            onError={(e) => {
              // Fallback: hide broken img, reveal CSS background color
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="envelope-particles" id="envelope-particles">
            {/* Render 35 golden particle dots */}
            {Array.from({ length: 35 }).map((_, idx) => {
              const size = 2 + Math.random() * 4;
              const left = Math.random() * 100;
              const delay = Math.random() * 12;
              const duration = 8 + Math.random() * 10;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245,228,168,0.9) 0%, rgba(232,197,99,0.4) 100%)',
                    animation: `envelopeParticleFloat ${duration}s ${delay}s linear infinite`,
                    pointerEvents: 'none'
                  }}
                />
              );
            })}
          </div>

          <div className="envelope-open-hint">
            <span className="hint-icon">
              <Sparkles style={{ width: '100%', height: '100%' }} />
            </span>
            <span>Touch the Seal to Open</span>
          </div>
        </div>
      )}

      {/* 3. Floating audio and controls */}
      <audio
        ref={audioRef}
        id="mangal-dhun-audio"
        src="/assets/romantic_wedding.mp3"
        loop
        preload="auto"
      />

      <div className="floating-controls" id="floating-controls" aria-label="Floating quick controls">
        <button
          className={`floating-control-btn music-toggle ${musicPlaying ? 'playing' : ''}`}
          id="music-toggle-btn"
          aria-label="Toggle romantic wedding music"
          onClick={() => toggleMusic()}
          type="button"
        >
          <Music id="music-icon" />
        </button>
        <button
          className={`floating-control-btn back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
          id="back-to-top-btn"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
        >
          <ArrowUp />
        </button>
      </div>

      {/* 4. Main Site Wrapper */}
      <div id="main-website" className={envelopeAnimationDone ? 'visible' : ''}>
        {/* ==========================================
             HERO SECTION
             ========================================== */}
        <section className="hero-section" id="hero">
          <img
            className="hero-video-bg"
            src={isReception ? "/assets/images/wedding_heros.jpg" : "/assets/images/wedding_hero.jpeg"}
            alt="Traditional wedding mandap with Himalayan mountains"
            fetchPriority="high"
          />
          <div className="hero-video-overlay" />

          <div className="hero-topline">
            <span>Abishmi &amp; Shesh</span>
            <button
              className="topbar-lang-btn"
              id="lang-toggle-btn"
              aria-label="Toggle language between English and Nepali"
              onClick={() => setLang(l => l === 'en' ? 'np' : 'en')}
              type="button"
            >
              <span className="topbar-lang-label">{lang === 'en' ? 'नेपाली' : 'ENG'}</span>
            </button>
            <span>July 2026</span>
          </div>

          <div className="hero-content">
            <div className="ganesh-invocation" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                <path d="M50,15 C45,15 42,20 40,25 C45,28 55,28 60,25 C58,20 55,15 50,15 Z M50,7 C49,7 48,9 50,9 C52,9 51,7 50,7 Z M50,10 C48,10 47,13 50,13 C53,13 52,10 50,10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M40,25 C32,25 28,32 28,40 C28,48 35,52 42,50 C38,55 35,62 38,68 C40,72 45,74 50,74 C55,74 60,72 62,68 C65,62 62,55 58,50 C65,52 72,48 72,40 C72,32 68,25 60,25" fill="none" stroke="currentColor" stroke-width="2.5" strokeLinecap="round" />
                <path d="M50,40 C43,43 45,55 50,58 C55,60 56,66 54,72 C51,78 42,76 42,82 C42,88 52,90 54,84 C56,78 62,80 62,70 C62,60 58,54 50,40 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M50,28 L50,36 M48,32 L52,32" fill="none" stroke="var(--crimson-accent)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="68" cy="55" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </div>

            <p className="hero-subtitle">{t.weddingCelebration}</p>
            <h1 className="hero-title">
              <span>Abishmi</span>
              <span>&amp;</span>
              <span>Shesh</span>
            </h1>
            <p className="hero-names-details">{t.marriage}</p>
            <p className="hero-names-details hero-names-details--party">{t.party}</p>
            <p className="hero-location">{t.heroLocation}</p>

            <div className="hero-actions">
              <a className="hero-link" href="#invitation-preview">{t.viewInvitation}</a>
              <button className="hero-link hero-link--ghost calendar-add-btn" onClick={handleAddToCalendar} type="button">{t.addToCalendar}</button>
            </div>
          </div>

          <a className="hero-scroll-cue" href="#invitation-preview" aria-label="Scroll to invitation preview">
            <span />
          </a>
        </section>

        {/* ==========================================
             SCRATCH CARD SECTION
             ========================================== */}
        <section className="date-scratch-section reveal" aria-label="Scratch to reveal the wedding date">
          <div className="date-scratch-copy">
            <span className="invitation-preview-kicker">{t.saveTheDate}</span>
            <h2>{t.revealCelebration}</h2>
          </div>

          <div className="scratch-card-container">
            <div className="scratch-revealed-date">
              <h3>{t.scratchDate}</h3>
              <p>{t.scratchVenue}</p>
              <button className="primary-btn calendar-add-btn" onClick={handleAddToCalendar} type="button">{t.addToCalendar}</button>
            </div>
            <ScratchCard isVisible={envelopeAnimationDone} />
          </div>
        </section>

        {/* ==========================================
             FORMAL INVITATION PREVIEW
             ========================================== */}
        <section className="invitation-preview-section" id="invitation-preview" aria-label="Wedding invitation preview">
          <div className="invitation-preview-copy">
            <span className="invitation-preview-kicker">{t.formalInvitation}</span>
            <h2>Abishmi &amp; Shesh</h2>
          </div>

          <figure className="invitation-preview-frame">
            <img src="/assets/images/wedding_invitation.jpg" alt="Formal wedding invitation for Abishmi and Shesh" loading="lazy" decoding="async" />
          </figure>
        </section>

        {/* ==========================================
             WELCOME INVITATION SECTION
             ========================================== */}
        <section className="section welcome-section reveal" id="welcome">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2, 2" />
            </svg>
            <h2 className="section-title">{t.sectionWelcomeTitle}</h2>
            <p className="section-subtitle">{t.sectionWelcomeSubtitle}</p>
          </div>

          <div className="welcome-panel">
            <div className="welcome-image-container">
              <img src="/assets/images/kalash_welcome.jpg" alt="Auspicious Kalash representing welcoming invitations" loading="lazy" decoding="async" />
            </div>

            <div className="welcome-card-content">
              <span className="welcome-kicker">{t.welcomeKicker}</span>
              <h3>{t.welcomeHeading}</h3>
              <p className="welcome-lead">{t.welcomeLead}</p>
              <p>{t.welcomeBody}</p>

              <div className="inviter-names" aria-label="Inviting families">
                <div className="inviter-group">
                  <h5>{t.groomParentsLabel}</h5>
                  <p>{groomParents}</p>
                </div>
                <div className="inviter-divider" aria-hidden="true" />
                <div className="inviter-group">
                  <h5>{t.brideParentsLabel}</h5>
                  <p>{brideParents}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* ==========================================
             OUR LOVE STORY SECTION
             ========================================== */}
        <section className="section story-section reveal" id="our-story">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2, 2" />
            </svg>
            <h2 className="section-title">{t.sectionStoryTitle}</h2>
            <p className="section-subtitle">{t.sectionStorySubtitle}</p>
          </div>

          <div className="story-timeline">
            {/* Chapter 1 */}
            <div className="story-chapter reveal">
              <div className="story-chapter-image">
                <img src="/assets/images/img0.jpg" alt="Abishmi and Shesh meeting at a school function" />
                <div className="story-chapter-number">०१</div>
              </div>
              <div className="story-chapter-text">
                <span className="story-chapter-label">{t.ch1Label}</span>
                <h3 className="story-chapter-title">{t.ch1Title}</h3>
                <p className="story-chapter-year">{t.ch1Year}</p>
                <p className="story-chapter-desc">{t.ch1Desc}</p>
                <div className="story-chapter-ornament">
                  <svg viewBox="0 0 60 12" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="30" cy="6" r="3" fill="currentColor" />
                    <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="story-chapter story-chapter--reverse reveal">
              <div className="story-chapter-image">
                <img src="/assets/images/img2.jpg" alt="Abishmi and Shesh going on their first date" />
                <div className="story-chapter-number">०२</div>
              </div>
              <div className="story-chapter-text">
                <span className="story-chapter-label">{t.ch2Label}</span>
                <h3 className="story-chapter-title">{t.ch2Title}</h3>
                <p className="story-chapter-year">{t.ch2Year}</p>
                <p className="story-chapter-desc">{t.ch2Desc}</p>
                <div className="story-chapter-ornament">
                  <svg viewBox="0 0 60 12" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="30" cy="6" r="3" fill="currentColor" />
                    <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Chapter 3 */}
            <div className="story-chapter reveal">
              <div className="story-chapter-image">
                <img src="/assets/images/img3.jpg" alt="Abishmi and Shesh proposing their forever love" />
                <div className="story-chapter-number">०३</div>
              </div>
              <div className="story-chapter-text">
                <span className="story-chapter-label">{t.ch3Label}</span>
                <h3 className="story-chapter-title">{t.ch3Title}</h3>
                <p className="story-chapter-year">{t.ch3Year}</p>
                <p className="story-chapter-desc">{t.ch3Desc}</p>
                <div className="story-chapter-ornament">
                  <svg viewBox="0 0 60 12" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="30" cy="6" r="3" fill="currentColor" />
                    <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>

        {/* ==========================================
             ITINERARY / TIMELINE SECTION
             ========================================== */}
        <section className="section itinerary-section" id="itinerary">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2, 2" />
            </svg>
            <h2 className="section-title">{t.sectionItineraryTitle}</h2>
            <p className="section-subtitle">{t.sectionItinerarySubtitle}</p>
          </div>

          <div className="timeline-container">
            <div className="timeline-item reveal">
              <div className="event-image-box">
                <img src={isReception ? "/assets/images/img4.jpg" : "/assets/images/maximss.jpg"} alt="Marriage ceremony venue" />
              </div>
              <div className="event-details-card">
                <span className="event-badge">{t.day1Badge}</span>
                <h3 className="event-title">{t.day1Title}</h3>
                <div className="event-meta">
                  <div className="meta-item"><Calendar style={{ width: 14, height: 14 }} />{t.day1Date}</div>
                  <div className="meta-item"><Clock style={{ width: 14, height: 14 }} />{isReception ? t.day1TimeReception : t.day1Time}</div>
                  <div className="meta-item"><MapPin style={{ width: 14, height: 14 }} />{t.day1Venue}</div>
                </div>
                {!isReception && (
                  <div className="ceremony-highlights" aria-label="Marriage ceremony timings">
                    <div><span>{t.muhurat}</span><strong>11:30 AM</strong></div>
                    <div><span>{t.kanyadaan}</span><strong>1:30 PM</strong></div>
                    <div><span>{t.aarti}</span><strong>6:40 PM</strong></div>
                  </div>
                )}
                <p className="event-description">{t.day1Desc}</p>
                <a href="https://maps.app.goo.gl/ZmFc1q9Lf7NHqP3k9" target="_blank" rel="noopener noreferrer" className="action-btn">
                  <ExternalLink style={{ width: 14, height: 14 }} />{t.viewVenueMap}
                </a>
              </div>
            </div>

            <div className="timeline-item reveal">
              <div className="event-image-box">
                <img src={isReception ? "/assets/images/maximg.jpg" : "/assets/images/img4.jpg"} alt="Wedding party banquet" />
              </div>
              <div className="event-details-card">
                <span className="event-badge">{t.day2Badge}</span>
                <h3 className="event-title">{t.day2Title}</h3>
                <div className="event-meta">
                  <div className="meta-item"><Calendar style={{ width: 14, height: 14 }} />{t.day2Date}</div>
                  <div className="meta-item"><Clock style={{ width: 14, height: 14 }} />{isReception ? t.day2TimeReception : t.day2Time}</div>
                  <div className="meta-item"><MapPin style={{ width: 14, height: 14 }} />{t.day2Venue}</div>
                </div>
                <p className="event-description">{t.day2Desc}</p>
                <a href="https://maps.app.goo.gl/6ctvC4EWxoSCcrECA" target="_blank" rel="noopener noreferrer" className="action-btn">
                  <ExternalLink style={{ width: 14, height: 14 }} />{t.viewVenueMap}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>

        {/* ==========================================
             VENUE MAP SECTION
             ========================================== */}
        <section className="section venue-map-section" id="venue-map">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2, 2" />
            </svg>
            <h2 className="section-title">{t.sectionVenueTitle}</h2>
            <p className="section-subtitle">{t.sectionVenueSubtitle}</p>
          </div>

          <div className="venue-map-grid">
            <div className="venue-map-card reveal">
              <div className="venue-map-badge">
                <MapPin style={{ width: 14, height: 14 }} />
                <span>{t.venueBadgeCeremony}</span>
              </div>
              <div className="venue-map-info">
                <h3 className="venue-map-title">{t.venue1Title}</h3>
                <p className="venue-map-address">{t.venue1Address}</p>
                <div className="venue-map-events">
                  <span className="venue-event-tag">{t.venue1Tag}</span>
                </div>
              </div>
              <div className="venue-map-embed">
                <iframe title="Maxims Banquet and Events map location"
                  src="https://www.google.com/maps?output=embed&q=Maxims%20Banquet%20%26%20Events%20Kathmandu&z=16"
                  width="100%" height="320" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <a href="https://maps.app.goo.gl/ZmFc1q9Lf7NHqP3k9" target="_blank" rel="noopener noreferrer" className="venue-map-btn" id="ceremony-map-btn">
                <Map style={{ width: 14, height: 14 }} />{t.openInMaps}
              </a>
            </div>

            <div className="venue-map-card reveal">
              <div className="venue-map-badge venue-map-badge--reception">
                <PartyPopper style={{ width: 14, height: 14 }} />
                <span>{t.venueBadgeReception}</span>
              </div>
              <div className="venue-map-info">
                <h3 className="venue-map-title">{t.venue2Title}</h3>
                <p className="venue-map-address">{t.venue2Address}</p>
                <div className="venue-map-events">
                  <span className="venue-event-tag venue-event-tag--gold">{t.venue2Tag}</span>
                  <span className="venue-event-tag venue-event-tag--gold">{isReception ? t.day2TimeReception : t.day2Time}</span>
                </div>
              </div>
              <div className="venue-map-embed">
                <iframe title="Buddha Palace map location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56510.32926166983!2d85.2130632762314!3d27.720510163163386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19760cf434b1%3A0x95451d28a8f300fa!2sBuddha%20Palace%20Banquet!5e0!3m2!1sen!2snp!4v1780693136600!5m2!1sen!2snp"
                  width="100%" height="320" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <a href="https://maps.app.goo.gl/6ctvC4EWxoSCcrECA" target="_blank" rel="noopener noreferrer" className="venue-map-btn venue-map-btn--gold" id="reception-map-btn">
                <Map style={{ width: 14, height: 14 }} />{t.openInMaps}
              </a>
            </div>
          </div>

          <div className="venue-map-notice reveal">
            <Info style={{ width: 14, height: 14, flexShrink: 0 }} />
            <p dangerouslySetInnerHTML={{ __html: t.venueNotice }} />
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>

        {/* ==========================================
             RSVP SECTION
             ========================================== */}
        <section className="section rsvp-section" id="rsvp">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" stroke-width="1" stroke-dasharray="2, 2" />
            </svg>
            <h2 className="section-title">RSVP</h2>
            <p className="section-subtitle">Kindly Respond by June 15, 2026</p>
          </div>

          <div className="card-elegant rsvp-card reveal">
            {!rsvpSuccess ? (
              <form className="rsvp-form" id="wedding-rsvp-form" onSubmit={handleRsvpSubmit}>
                {isReception ? (
                  <>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-fullname">
                          <User className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.yourFullName}
                        </label>
                        <input className="form-input" type="text" id="guest-fullname" name="fullname"
                          placeholder={t.namePlaceholder} value={rsvpFormState.fullname}
                          onChange={(e) => setRsvpFormState({ ...rsvpFormState, fullname: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-email">
                          <Mail className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.emailAddress}
                        </label>
                        <input className="form-input" type="email" id="guest-email" name="email"
                          placeholder={t.emailPlaceholder} value={rsvpFormState.email}
                          onChange={(e) => setRsvpFormState({ ...rsvpFormState, email: e.target.value })} required />
                      </div>
                    </div>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-count">
                          <Users className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.totalGuests}
                        </label>
                        <select className="form-input" id="guest-count" name="party_size"
                          value={rsvpFormState.party_size} onChange={(e) => setRsvpFormState({ ...rsvpFormState, party_size: e.target.value })}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-dietary">
                          <Utensils className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.dietaryPrefs}
                        </label>
                        <select className="form-input" id="guest-dietary" name="dietary"
                          value={rsvpFormState.dietary} onChange={(e) => setRsvpFormState({ ...rsvpFormState, dietary: e.target.value })}>
                          <option value="none">{t.dietaryStandard}</option>
                          <option value="veg">{t.dietaryVeg}</option>
                          <option value="non-veg">{t.dietaryNonVeg}</option>
                          <option value="vegan">{t.dietaryVegan}</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label"><CheckSquare className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.whichEvents}</label>
                      <div className="events-select">
                        <label className="checkbox-label">
                          <input type="checkbox" name="event_swayambar" checked={rsvpFormState.event_swayambar}
                            onChange={(e) => setRsvpFormState({ ...rsvpFormState, event_swayambar: e.target.checked })} />
                          <span className="custom-checkbox" />{t.eventMarriage}
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" name="event_reception" checked={rsvpFormState.event_reception}
                            onChange={(e) => setRsvpFormState({ ...rsvpFormState, event_reception: e.target.checked })} />
                          <span className="custom-checkbox" />{t.eventParty}
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label"><Bus className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.jantiLabel}</label>
                      <div className="events-select">
                        <label className="checkbox-label">
                          <input type="checkbox" id="janti-transport" name="janti_transport" checked={rsvpFormState.janti_transport}
                            onChange={(e) => setRsvpFormState({ ...rsvpFormState, janti_transport: e.target.checked })} />
                          <span className="custom-checkbox" />{t.jantiText}
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="guest-song">
                        <Music className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.songLabel}
                      </label>
                      <input className="form-input" type="text" id="guest-song" name="song_suggestion"
                        placeholder={t.songPlaceholder} value={rsvpFormState.song_suggestion}
                        onChange={(e) => setRsvpFormState({ ...rsvpFormState, song_suggestion: e.target.value })} />
                    </div>
                  </>
                ) : (
                  <div className="form-group">
                    <label className="form-label" htmlFor="guest-fullname">
                      <User className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.yourFullName}
                    </label>
                    <input className="form-input" type="text" id="guest-fullname" name="fullname"
                      placeholder={t.namePlaceholder} value={rsvpFormState.fullname}
                      onChange={(e) => setRsvpFormState({ ...rsvpFormState, fullname: e.target.value })} required />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label" htmlFor="guest-notes">
                    <MessageSquare className="form-field-icon" style={{ width: 14, height: 14 }} /> {t.blessingsLabel}
                  </label>
                  <textarea className="form-input" id="guest-notes" name="notes" rows={isReception ? 4 : 5}
                    placeholder={isReception ? t.blessingsPlaceholderReception : t.blessingsPlaceholder}
                    value={rsvpFormState.notes} onChange={(e) => setRsvpFormState({ ...rsvpFormState, notes: e.target.value })} />
                </div>
                <button className="primary-btn" type="submit" disabled={isSendingRsvp}
                  style={{ width: '100%', fontSize: '12px', letterSpacing: '2px', fontWeight: 700, marginTop: '10px' }}>
                  {isSendingRsvp ? t.sendingRsvp : t.submitRsvp}
                </button>
              </form>
            ) : (
              <div className="rsvp-success-overlay active" id="rsvp-success-screen">
                <div className="success-icon-box"><Heart className="success-heart-icon" /></div>
                <h3 className="success-title">{t.successTitle}</h3>
                <p className="success-message">{t.successMsg}</p>
                <button className="action-btn" id="reset-rsvp-btn" onClick={handleResetRsvp}>{t.updateRsvp}</button>
              </div>
            )}
          </div>
        </section>

        {/* ==========================================
             FOOTER
             ========================================== */}
        <footer>
          <div className="footer-logo">A &amp; S</div>
          <p className="footer-quote">{t.footerQuote}</p>
          {!isReception && (
            <div className="footer-contacts" aria-label="Wedding contact numbers">
              <a href="tel:+9779851417703">{t.footerBrideGroom}</a>
              <span aria-hidden="true">•</span>
              <a href="tel:+9779851310689">{t.footerMama}</a>
            </div>
          )}
          <p className="footer-copy">{t.footerCopy}</p>
        </footer>
      </div>
    </>
  );
}
