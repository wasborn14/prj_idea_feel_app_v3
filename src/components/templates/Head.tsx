import NextHead from 'next/head'

export interface HeadProps {
  pageTitle: string
  meta?: {
    description?: string
    keywords?: string
    googleSiteVerification?: string
    ogTitle?: string
    ogType?: string
    ogUrl?: string
    ogImage?: string
    ogSiteName?: string
    ogDescription?: string
  }
}
/* // metaにnameとcontentをpropsから適応する */
export const Head = ({ pageTitle, meta }: HeadProps) => (
  <NextHead>
    <link rel='icon' href='/favicon.ico' />
    <meta name='description' content={meta?.description ?? 'ideaアプリ説明'} />
    <meta name='keywords' content={meta?.keywords ?? 'idea アプリ メモ'} />
    <title>{pageTitle}</title>
  </NextHead>
)
