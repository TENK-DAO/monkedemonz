import * as React from "react"
import { PageProps } from "gatsby"

import Hero from "../components/hero"
import MyNFTs from "../components/my-nfts"
import Section from "../components/section"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Markdown from "../components/markdown"
import Footer from "../components/footer"
import type { DecoratedLocale } from "../../lib/locales"
import Reveal from "../components/reveal"
import { navigate } from "gatsby"

type PageContext = {
  locale: DecoratedLocale
}

const Landing: React.FC<PageProps<{}, PageContext>> = ({ location, pageContext: { locale } }) => {
  const params = new URLSearchParams(location.search)
  const transactionHashes = params.get('transactionHashes')

  if (transactionHashes) {
    return <Reveal onClose={() => navigate(`/${locale.id}`)} />
  }

  return (
    <Layout title={locale.title}>
      <Seo lang={locale.id} title={locale.title} description={locale.description} />
      <MyNFTs />
      <Hero heroTree={locale.hero} />
      {locale.extraSections?.map((section, i) => (
        <Section key={i} {...section}>
          <Markdown children={section.text} />
        </Section>
      ))}
      <Footer />
    </Layout>
  )
}

export default Landing