import { useRef } from 'react'
import { Updater, useImmer } from 'use-immer'

export default function useStateRef<T>(initialValue: T) {
  const [state, setState] = useImmer<T>(initialValue);
  const stateRef = useRef<T>(initialValue)

  const setStateRef: Updater<T> = () => {

  }

  return
}