import React, { useEffect, useState } from 'react'

import { get } from 'lodash/get'

import Button from '../components/basic/Button'
import Card from '../components/basic/Card'
import ErrorText from '../components/basic/ErrorText'

import Text from '../components/basic/Text'
import Title from '../components/basic/Title'
import useWeb3Wallet from '../utils/useWeb3Wallet'

const LinkWallet = ({ reloadStatus }) => {
  const { wallet, signer } = useWeb3Wallet()
  const [linkCode, setLinkCode] = useState(null)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!linkCode) return

    const interval = setInterval(() => reloadStatus(), 3000)

    return () => {
      clearInterval(interval)
    }
  }, [linkCode])

  const linkWallet = async (e) => {
    e.preventDefault()
    setError(null)
    setLinkCode(null)
    setSaving(true)
    try {
      const sign = await signer.signMessage(`I want to use this wallet for Telegram Unlock Bot`)
  
      const resp = await fetch('/api/users/generate-link-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: wallet.account,
          sign
        })
      })

      const { success, linkCode, errors } = await resp.json()

      setLinkCode(linkCode)
      if (!success) {
        setError(get(errors, '0', 'Failed to link your account, try again'))
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
  
  const openBotWindow = () => {
    const url = `https://t.me/${
      process.env.TELEGRAM_BOT_USERNAME || 'UnlockDevBot'
    }?start=${encodeURIComponent(linkCode)}`
    window.open(url, '_blank')
  }

  return (
    <div className="container px-8 py-4">
      <Card>
        <Title className="mb-1">Link your Telegram account</Title>
        <Text>Step {linkCode ? 2 : 1} of 2</Text>

        <Text className="text-lg mt-3">
          {linkCode ? `Send the following message to the Unlock Bot to complete verification` : `Sign a message with your wallet to verify that you own the wallet.`}
        </Text>

        <form onSubmit={linkWallet}>
          <div className="flex items-center justify-center mb-2">
            {linkCode ? (
              <>
                <input 
                  type="text" 
                  placeholder="Enter your Telegram username" 
                  value={`/start ${linkCode || ''}`}
                  disabled={true} 
                  className="inline-block mx-0 rounded-r-none focus:outline-none"
                  required={true}
                />
                <Button className="m-0 py-2 px-2 rounded-l-none border min-w-0 border-blue-400" onClick={openBotWindow}>
                  Message bot
                </Button>
              </>
            ) : (
              <Button type="submit" className="m-0 py-2 px-2 border min-w-0 border-blue-400" disabled={saving}>
                {saving ? 'Linking...' : 'Sign a message'}
              </Button>
            )}
          </div>
          {!error ? null : <ErrorText>{error}</ErrorText>}
        </form>
      </Card>
    </div>
  )
}

export default LinkWallet
