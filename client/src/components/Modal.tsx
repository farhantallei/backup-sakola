import { IconFilePlus, TablerIcon } from '@tabler/icons';
import classNames from 'classnames';
import { Text } from './typography';
import { Loader } from './ui';

interface ModalProps {
  title?: string;
  Icon?: TablerIcon;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  isLoading?: boolean;
  error?: unknown;
  className?: string;
  children?: React.ReactNode;
}

// TODO: Add icon
function Modal({
  title = 'Modal Title',
  Icon,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onSubmit,
  onClose,
  onEnter,
  onEscape,
  isLoading = false,
  error,
  className,
  children,
}: ModalProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') onEscape?.();
    if (e.key === 'Enter') onEnter?.();
  }

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center">
          <div
            onKeyDown={handleKeyDown}
            className={classNames(
              'flex flex-col relative overflow-hidden rounded-2xl bg-white text-left shadow-xl my-8 w-full max-w-lg px-6 pb-4 gap-4',
              { 'pt-2': !Icon, 'pt-8': !!Icon }
            )}>
            <div className="bg-white">
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center">
                  {Icon ? (
                    <Icon size={48} stroke={1} className="-ml-2" />
                  ) : null}
                  {error ? (
                    <div className="flex-1">
                      {error instanceof Error ? (
                        <Text align="center" className="text-red-600">
                          {error.message}
                        </Text>
                      ) : (
                        <Text align="center" className="text-red-600">
                          Something goes error. Please refresh your page.
                        </Text>
                      )}
                    </div>
                  ) : null}
                </div>
                <Text size="lg" weight={600}>
                  {title}
                </Text>
              </div>
              <div className={classNames('mt-2', className)}>{children}</div>
            </div>
            <div className="flex flex-col sm:flex-row-reverse sm:items-center">
              <button
                type="button"
                onClick={onSubmit}
                className="inline-flex w-full min-w-[5rem] justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                {isLoading ? <Loader className="fill-white" /> : submitLabel}
              </button>
              <div className="mt-3 inline-flex w-full justify-center px-4 py-2 sm:mt-0 sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-sm text-base font-medium text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm">
                  {cancelLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
