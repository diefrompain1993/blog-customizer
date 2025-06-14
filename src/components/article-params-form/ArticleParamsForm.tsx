import React, { useRef, useEffect, useState } from 'react'
import clsx from 'clsx'

import { ArrowButton } from 'src/ui/arrow-button'
import { Select }      from 'src/ui/select'
import { RadioGroup }  from 'src/ui/radio-group'
import { Separator }   from 'src/ui/separator'
import { Button }      from 'src/ui/button'
import { Text }        from 'src/ui/text'

import type { ArticleStateType } from 'src/constants/articleProps'
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
} from 'src/constants/articleProps'

import styles from './ArticleParamsForm.module.scss'

const PANEL_WIDTH = 616
const ARROW_SIZE  = 48

type Props = {
  isMenuOpen: boolean
  initialState: ArticleStateType
  onToggle: () => void
  onApply: (newState: ArticleStateType) => void
  onReset: () => void
}

export const ArticleParamsForm: React.FC<Props> = ({
  isMenuOpen,
  initialState,
  onToggle,
  onApply,
  onReset,
}) => {
  const [formState, setFormState] = useState<ArticleStateType>(initialState)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMenuOpen) setFormState(initialState)
  }, [isMenuOpen, initialState])

  useEffect(() => {
    if (!isMenuOpen) return
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        !t.closest(`.${styles.arrowWrapper}`)
      ) {
        onToggle()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isMenuOpen, onToggle])

  const arrowLeft = isMenuOpen
    ? PANEL_WIDTH - ARROW_SIZE / 2
    : -ARROW_SIZE / 2

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onApply(formState)
  }

  const handleReset = () => {
    setFormState(defaultArticleState)
    onReset()
  }

  return (
    <>
      <div
        className={styles.arrowWrapper}
        style={{ left: `${arrowLeft}px` }}
      >
        <ArrowButton isOpen={isMenuOpen} onClick={onToggle} />
      </div>

      <aside
        ref={panelRef}
        className={clsx(styles.container, isMenuOpen && styles.open)}
      >
        <div className={styles.header}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={opt =>
                setFormState(prev => ({ ...prev, fontFamilyOption: opt }))
              }
            />
          </div>

          <div className={styles.field}>
            <RadioGroup
              name="fontSize"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={opt =>
                setFormState(prev => ({ ...prev, fontSizeOption: opt }))
              }
            />
          </div>

          <div className={styles.field}>
            <Select
              title="Цвет шрифта"
              selected={formState.fontColor}
              options={fontColors}
              onChange={opt =>
                setFormState(prev => ({ ...prev, fontColor: opt }))
              }
            />
          </div>

          <div className={styles.divider}>
            <Separator />
          </div>

          <div className={styles.field}>
            <Select
              title="Цвет фона"
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={opt =>
                setFormState(prev => ({ ...prev, backgroundColor: opt }))
              }
            />
          </div>

          <div className={styles.field}>
            <Select
              title="Ширина контента"
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={opt =>
                setFormState(prev => ({ ...prev, contentWidth: opt }))
              }
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              type="clear"
              htmlType="button"
              onClick={handleReset}
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
            />
          </div>
        </form>
      </aside>
    </>
  )
}
