import React, { useEffect, useMemo, useState } from "react"
import Video from "../video"
import { wallet } from "../../near"
import useTenk from '../../hooks/useTenk'
import * as css from "./reveal.module.css"

const Reveal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const currentUser = wallet.getAccountId()
  const { stale, nfts } = useTenk()
  const [ended, setEnded] = useState(false)

  const onKeyPress = useMemo(() => (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [])

  useEffect(() => {
    document.addEventListener('click', onClose)
    document.addEventListener('keyup', onKeyPress)
  }, [])

  useEffect(() => {
    if (!currentUser || (!stale && !nfts.length)) {
      onClose()
    }
  }, [currentUser, stale, nfts])

  if (!currentUser || !nfts.length) return null

  const nft = nfts[nfts.length - 1]

  return (
    <div className={css.reveal}>
      <Video
        src="RevealBackground.mp4"
        autoPlay
        loop
        style={{ display: ended ? undefined : 'none' }}
      />
      <figure style={{ display: ended ? undefined : 'none' }}>
        <img
          alt={nft.metadata?.title}
          src={nft.media}
        />
        <figcaption>
          #{nft.token_id}
        </figcaption>
      </figure>
      {!ended && (
        <Video
          src="Minting_Animation.mp4"
          autoPlay
          onEnded={() => setEnded(true)}
        />
      )}
    </div>
  )
}

export default Reveal