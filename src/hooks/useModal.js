import { useCallback, useContext, useMemo } from 'react'
import { modalContext } from '../providers/ModalProvider'

export function useModal(modal) {
  const { openModal, closeModal } = useContext(modalContext)

  const open = useCallback(
    (props) => openModal(modal, props),
    [openModal, modal]
  )

  const close = useCallback(() => closeModal(modal), [closeModal, modal])

  return useMemo(() => ({ open, close }), [open, close])
}

export function getUseModal(modal) {
  return () => useModal(modal)
}
