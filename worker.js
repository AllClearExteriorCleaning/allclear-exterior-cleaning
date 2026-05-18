import locationData from './data.json';
import templateHtml from './template.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    // Matches routes like: domain.com/whitchurch/window-cleaning
    if (pathParts.length === 2) {
      const targetLocation = pathParts[0].toLowerCase();
      const targetService = pathParts[1].toLowerCase();

      if (locationData[targetLocation]) {
        const loc = locationData[targetLocation];
        
        // Define fallback defaults
        let serviceName = "Window Cleaning";
        let serviceIntro = "We provide reliable 4 or 8-weekly window cleaning schedules using advanced high-reach pure water fed pole systems. By filtering minerals down to absolute 0 parts per million, your windows dry completely streak-free naturally. We always clean your glass, frames, sills, and external doors as standard on every single visit.";
        let serviceNote = loc.window_note;

        // Custom services matching engine
        if (targetService === "gutter-cleaning") {
          serviceName = "Gutter Clearance";
          serviceIntro = "Blocked gutters can cause severe, costly internal damp issues and structural brickwork damage. Our team uses commercial-grade, high-suction skyVac gutter clearance systems to safely lift out heavy wet moss, leaf buildup, silt, and debris entirely from the ground. Downpipes are thoroughly checked and unblocked.";
          serviceNote = loc.gutter_note;
        } else if (targetService === "fascia-cleaning") {
          serviceName = "Fascia & Soffit Cleaning";
          serviceIntro = "Over time, grey atmospheric grime and green algae can leave your plastics looking tired and weatherworn, severely impacting your property's kerb appeal. Our deep-wash fascia and soffit cleaning restoration service uses specialized eco-friendly detergents to clean and lift away stains, returning your uPVC back to pristine condition.";
          serviceNote = loc.fascia_note;
        } else if (targetService === "conservatory-cleaning") {
          serviceName = "Conservatory Roof Cleaning";
          serviceIntro = "Don't let green algae, baked-on bird droppings, and thick moss ruin your view and block out natural light. Our specialist conservatory roof cleaning service safely restores both glass and polycarbonate roofs. Using low-pressure pure water systems and specialized brushes, we lift away organic growth and grime without damaging delicate roof seals or structural plastics.";
          serviceNote = loc.conservatory_note;
        }

        // Programmatic high-converting metadata and variables
        const pageTitle = `Professional ${serviceName} in ${loc.name} | All Clear Exterior Cleaning`;
        const metaDesc = `Looking for trusted ${serviceName.toLowerCase()} across ${loc.name} (${loc.postcode})? Fully insured exterior maintenance specialists serving near ${loc.landmark} and local neighborhoods.`;
        const heroHeading = `Sparkling Clean ${serviceName} Solutions Across ${loc.name}`;
        const heroSubtitle = `Reliable, fully insured exterior cleaning specialists serving properties in ${loc.name} (${loc.postcode}) with pristine results every single time.`;
        const web3formsSubject = `New Lead: ${serviceName} - ${loc.name} (${loc.postcode})`;

        // Efficient variable substitution loop
        let outputHtml = templateHtml
          .replaceAll('{{ PAGE_TITLE }}', pageTitle)
          .replaceAll('{{ META_DESCRIPTION }}', metaDesc)
          .replaceAll('{{ HERO_HEADING }}', heroHeading)
          .replaceAll('{{ HERO_SUBTITLE }}', heroSubtitle)
          .replaceAll('{{ LOCATION_NAME }}', loc.name)
          .replaceAll('{{ SERVICE_NAME }}', serviceName)
          .replaceAll('{{ POSTCODE }}', loc.postcode)
          .replaceAll('{{ SERVICE_INTRO }}', serviceIntro)
          .replaceAll('{{ LANDMARK }}', loc.landmark)
          .replaceAll('{{ SERVICE_NOTE }}', serviceNote)
          .replaceAll('{{ FORM_SUBJECT }}', web3formsSubject);

        return new Response(outputHtml, {
          headers: { 'content-type': 'text/html;charset=UTF-8' },
        });
      }
    }

    // Default: Return regular file directory asset if path does not match
    return fetch(request);
  },
};
