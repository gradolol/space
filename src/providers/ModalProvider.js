import React, { memo, useMemo, useCallback, createContext, useRef } from 'react'
import { useUpdate } from 'react-use'

export const modalContext = createContext({})

function ModalProviderRaw({ children }) {
  const update = useUpdate()

  const stateRef = useRef(null)

  const openModal = useCallback(
    function (modal, props) {
      stateRef.current = { modal, props }
      update()
    },
    [update]
  )

  const closeModal = useCallback(
    function (modal) {
      if (modal && modal !== stateRef.current?.modal) return
      stateRef.current = null
      update()
    },
    [update]
  )

  const context = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  )

  const handleClose = useCallback(() => closeModal(), [closeModal])

  return (
    <modalContext.Provider value={context}>
      {children}
      {stateRef.current && (
        <stateRef.current.modal
          onClose={handleClose}
          {...stateRef.current.props}
        />
      )}
    </modalContext.Provider>
  )
}

export const ModalProvider = memo(ModalProviderRaw)
