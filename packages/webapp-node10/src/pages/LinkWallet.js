import React, { useState } from 'react'
import Button from '../components/basic/Button'
import Card from '../components/basic/Card'
import ErrorText from '../components/basic/ErrorText'

import Text from '../components/basic/Text'
import Title from '../components/basic/Title'
import useWallet from '../utils/useWallet'

const LinkWallet = ({ reloadStatus }) => {
  const wallet = useWallet()
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const linkWallet = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      console.log(wallet)
      const sign = await wallet.signer.signMessage(`I want to use this wallet for Telegram Unlock Bot`)
  
      const resp = await fetch('/api/users/link-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: wallet.address,
          sign
        })
      })

      const { success, verifyHash } = await resp.json()

      if (success) {
        reloadStatus()
      }
    } catch (err) {
      console.error(err)

      if (err.code === 4001) {
        setError(`Message wasn't signed.`)
      } else {
        setError('Failed to link your account, try again')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container px-8 py-4">
      <Card>
        <Title className="mb-1">Link your Telegram account</Title>
        <Text>You are one step away from getting access to locked channels.</Text>
        <Text className="text-lg mt-3">Associate a Telegram account with your wallet to begin.</Text>

        <form onSubmit={linkWallet}>
          <div className="d-flex align-items-center justify-content-center mb-2 link-wallet-form">
            <Button type="submit" className="m-0 btn-sm" disabled={saving}>
              {saving ? 'Linking...' : 'Link your account'}
            </Button>
          </div>
          {!error ? null : <ErrorText>{error}</ErrorText>}
        </form>
      </Card>
    </div>
  )
}

export default LinkWallet
