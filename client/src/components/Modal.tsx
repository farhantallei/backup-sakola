import { IconX, TablerIcon } from '@tabler/icons';
import classNames from 'classnames';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Text } from './typography';
import { ActionIcon, Loader } from './ui';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  withCloseButton?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  submitOnEnter?: boolean;
  Icon?: TablerIcon;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  error?: unknown;
  className?: string;
  children?: React.ReactNode;
}

// TODO: Add error text
function Modal({
  open,
  onClose,
  onSubmit,
  title,
  closeOnClickOutside = true,
  closeOnEscape = true,
  withCloseButton = true,
  size = 'md',
  submitOnEnter = true,
  Icon,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  isLoading = false,
  error,
  className,
  children,
}: ModalProps) {
  const sizes: Record<typeof size, string> = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (closeOnEscape && e.key === 'Escape') onClose();
    if (submitOnEnter && e.key === 'Enter') onSubmit?.();
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyDown);
    return () => window.removeEventListener('keyup', handleKeyDown);
  }, []);

  if (!open) return null;
  return createPortal(
    <>
      <div
        className={classNames(
          'fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-full',
          sizes[size]
        )}
        role="dialog"
        aria-modal="true">
        <div
          className={classNames(
            'flex flex-col rounded-2xl bg-white shadow-xl my-8 px-6 py-4 gap-4',
            { 'pt-8': !!Icon }
          )}>
          {Icon ? <Icon size={48} stroke={1} className="-ml-2" /> : null}
          {withCloseButton || title ? (
            <Header withCloseButton={withCloseButton} onClose={onClose}>
              {title}
            </Header>
          ) : null}
          {children ? (
            <div className={classNames(className)}>{children}</div>
          ) : null}
          <Footer
            onSubmit={onSubmit}
            onClose={onClose}
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div
        onClick={() => closeOnClickOutside && onClose()}
        className="fixed inset-0 bg-gray-500 bg-opacity-75 z-10"
      />
    </>,
    document.body
  );
}

function Header({
  withCloseButton,
  onClose,
  children,
}: {
  withCloseButton: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  if (!withCloseButton && !children) return null;
  return (
    <div
      className={classNames('flex flex-row items-center', {
        'justify-end': !children && withCloseButton,
        'justify-between': children && withCloseButton,
      })}>
      {children ? (
        <Text size="lg" weight={600}>
          {children}
        </Text>
      ) : null}
      {withCloseButton ? (
        <ActionIcon
          Icon={IconX}
          aria-label="Close"
          color="gray"
          onClick={onClose}
        />
      ) : null}
    </div>
  );
}

function Footer({
  onClose,
  onSubmit,
  submitLabel,
  cancelLabel,
  isLoading,
}: {
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel: string;
  cancelLabel: string;
  isLoading: boolean;
}) {
  if (onSubmit == null) return null;
  return (
    <div className="flex flex-row-reverse items-center gap-3">
      <button
        type="button"
        onClick={onSubmit}
        className="inline-flex min-w-[5rem] ml-3 w-auto text-sm justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
        {isLoading ? <Loader className="fill-white" /> : submitLabel}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="rounded-sm text-sm font-medium text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
        {cancelLabel}
      </button>
    </div>
  );
}

export default Modal;
