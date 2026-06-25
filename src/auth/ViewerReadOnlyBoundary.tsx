import {
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

type ViewerReadOnlyBoundaryProps = {
  enabled: boolean;
  children: ReactNode;
};

const blockedActionWords = [
  'زیاد',
  'دروستکردن',
  'دەستکاری',
  'گۆڕین',
  'نوێکردنەوە',
  'پاشەکەوت',
  'سڕینەوە',
  'لابردن',
  'تۆمارکردن',
  'ناردن',
  'ناردنی',
  'پێشکەشکردن',
  'پێشکەشکردنی',
  'کارپێکردنەوە',
  'ڕاگرتنی',
  'دەستپێکردن',
  'add',
  'create',
  'edit',
  'update',
  'save',
  'delete',
  'remove',
  'submit',
];

function hideElement(element: HTMLElement) {
  element.hidden = true;
  element.setAttribute('aria-hidden', 'true');
  element.setAttribute('tabindex', '-1');
}

function isEditingControl(element: HTMLElement): boolean {
  const searchableText = [
    element.textContent,
    element.getAttribute('aria-label'),
    element.getAttribute('title'),
    element.getAttribute('name'),
    element.getAttribute('data-action'),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return blockedActionWords.some((word) =>
    searchableText.includes(word.toLowerCase()),
  );
}

function applyReadOnlyMode(root: HTMLElement) {
  /*
   * Hide the complete editing panel rather than leaving an empty
   * form shell visible to viewers.
   */
  root
    .querySelectorAll<HTMLFormElement>('form')
    .forEach((form) => {
      const editingPanel =
        form.closest<HTMLElement>('[data-edit-section="true"]') ??
        form.parentElement?.parentElement ??
        form;

      hideElement(editingPanel);
    });

  root
    .querySelectorAll<HTMLElement>(
      [
        '[contenteditable="true"]',
        'button[type="submit"]',
        '[data-edit-control="true"]',
        '[data-action="add"]',
        '[data-action="create"]',
        '[data-action="edit"]',
        '[data-action="update"]',
        '[data-action="save"]',
        '[data-action="delete"]',
      ].join(','),
    )
    .forEach(hideElement);

  root
    .querySelectorAll<HTMLElement>('button, a')
    .forEach((element) => {
      if (isEditingControl(element)) {
        hideElement(element);
      }
    });

  root
    .querySelectorAll<HTMLElement>('[draggable="true"]')
    .forEach((element) => {
      element.setAttribute('draggable', 'false');
      element.style.pointerEvents = 'none';
    });
}

export default function ViewerReadOnlyBoundary({
  enabled,
  children,
}: ViewerReadOnlyBoundaryProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!enabled || !root) {
      return;
    }

    applyReadOnlyMode(root);

    const observer = new MutationObserver(() => {
      applyReadOnlyMode(root);
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
    });

    const preventEditing = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const editingControl =
        target.closest<HTMLElement>(
          'form, [contenteditable="true"], button, a, [data-edit-control="true"]',
        ) ?? target;

      if (
        editingControl.matches('form, [contenteditable="true"]') ||
        isEditingControl(editingControl)
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    root.addEventListener('submit', preventEditing, true);
    root.addEventListener('change', preventEditing, true);
    root.addEventListener('input', preventEditing, true);
    root.addEventListener('click', preventEditing, true);

    return () => {
      observer.disconnect();
      root.removeEventListener('submit', preventEditing, true);
      root.removeEventListener('change', preventEditing, true);
      root.removeEventListener('input', preventEditing, true);
      root.removeEventListener('click', preventEditing, true);
    };
  }, [enabled]);

  return (
    <div
      ref={rootRef}
      className={enabled ? 'viewer-read-only' : undefined}
      data-access-mode={enabled ? 'viewer' : 'editor'}
    >
      {children}
    </div>
  );
}
