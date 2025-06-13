import React, { useState, CSSProperties } from 'react'
import stylesIndex from './styles/index.module.scss'
import { Article } from './components/article/Article'
import { ArticleParamsForm } from './components/article-params-form'
import { defaultArticleState, type ArticleStateType } from './constants/articleProps'

export const App: React.FC = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState)
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState)
  const [isOpen, setIsOpen] = useState(false)

  const isWide = articleState.contentWidth.className === 'width-wide'

  return (
    <main
      className={stylesIndex.main}
      style={
        {
          '--bg-color': articleState.backgroundColor.value,
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        isOpen={isOpen}
        formState={formState}
        onChange={setFormState}
        onApply={() => setArticleState(formState)}
        onReset={() => {
          setFormState(defaultArticleState)
          setArticleState(defaultArticleState)
        }}
        onToggle={() => setIsOpen(o => !o)}
      />

      <Article isWide={isWide} />
    </main>
  )
}
