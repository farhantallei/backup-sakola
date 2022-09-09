import classNames from 'classnames';
import { Text } from './typography';
import { Loader } from './ui';

interface ModalProps {
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  isLoading?: boolean;
  error?: unknown;
  className?: string;
  children?: React.ReactNode;
}

function Modal({
  title = 'Modal Title',
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onSubmit,
  onClose,
  isLoading = false,
  error,
  className,
  children,
}: ModalProps) {
  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <Text size="lg" weight={600} className="text-gray-700">
                  {title}
                </Text>
                <div className={classNames('mt-2', className)}>{children}</div>
              </div>
            </div>
            <div className="sm:flex sm:flex-row-reverse sm:items-center sm:justify-between">
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
              {error && error instanceof Error ? (
                <div className="px-4 py-3">
                  <Text align="center" className="text-red-600">
                    {error.message}
                  </Text>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
