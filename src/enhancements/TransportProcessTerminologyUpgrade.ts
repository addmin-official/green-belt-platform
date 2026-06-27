const transportTerminologyReplacements = new Map<string, string>([
  ['گواستنەوەر', 'پڕۆسەی گواستنەوە'],
  ['گواستنەوەری', 'پڕۆسەی گواستنەوەی'],
  ['کۆکەرەوە و گواستنەوەری پەسەندکراو', 'کۆکردنەوە و پڕۆسەی گواستنەوەی پەسەندکراو'],
]);

function normalizeTransportTerminology(root: ParentNode = document): void {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const value = node.nodeValue ?? '';
        return [...transportTerminologyReplacements.keys()].some((term) =>
          value.includes(term),
        )
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );

  const nodes: Text[] = [];
  let current = walker.nextNode();

  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }

  nodes.forEach((node) => {
    let value = node.nodeValue ?? '';

    transportTerminologyReplacements.forEach((replacement, term) => {
      value = value.split(term).join(replacement);
    });

    node.nodeValue = value;
  });
}

function initializeTransportTerminologyUpgrade(): void {
  normalizeTransportTerminology();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          normalizeTransportTerminology(node.parentNode ?? document);
          return;
        }

        if (node instanceof HTMLElement) {
          normalizeTransportTerminology(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTransportTerminologyUpgrade, {
    once: true,
  });
} else {
  initializeTransportTerminologyUpgrade();
}
