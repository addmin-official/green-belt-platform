import {
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

type ViewerReadOnlyBoundaryProps = {
  enabled: boolean;
  children: ReactNode;
};

const mutationWords = [
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
  'add',
  'create',
  'edit',
  'update',
  'save',
  'delete',
  'remove',
  'submit',
];

function isMutationControl(element: HTMLElement): boolean {
  const text = [
    element.textContent,
    element.getAttribute('aria-label'),
    element.getAttribute('title'),
    element.getAttribute('name'),
    element.getAttribute('data-action'),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return mutationWords.some((word) =>
    text.includes(word.toLowerCase()),
  );
}

function applyReadOnlyMode(root: HTMLElement) {
  root
    .querySelectorAll<HTMLElement>(
      [
        'input',
        'textarea',
        'select',
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
    .forEach((element) => {
      element.hidden = true;
      element.setAttribute('aria-hidden', 'true');
      element.setAttribute('tabindex', '-1');
    });

  root
    .querySelectorAll<HTMLElement>('button, a')
    .forEach((element) => {
      if (isMutationControl(element)) {
        element.hidden = true;
        element.setAttribute('aria-hidden', 'true');
        element.setAttribute('tabindex', '-1');
      }
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

    const preventMutation = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (
        target.matches(
          'input, textarea, select, [contenteditable="true"]',
        ) ||
        isMutationControl(target.closest('button, a') ?? target)
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    root.addEventListener('submit', preventMutation, true);
    root.addEventListener('change', preventMutation, true);
    root.addEventListener('input', preventMutation, true);
    root.addEventListener('click', preventMutation, true);

    return () => {
      observer.disconnect();
      root.removeEventListener('submit', preventMutation, true);
      root.removeEventListener('change', preventMutation, true);
      root.removeEventListener('input', preventMutation, true);
      root.removeEventListener('click', preventMutation, true);
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
