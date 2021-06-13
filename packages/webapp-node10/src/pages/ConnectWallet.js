import React from 'react'
import Button from '../components/basic/Button'
import Card from '../components/basic/Card'
import Title from '../components/basic/Title'
import Text from '../components/basic/Text'
import ErrorText from '../components/basic/ErrorText'
import useWallet from '../utils/useWallet'

const ConnectWallet = () => {
  const wallet = useWallet()
  return (
    <div className="container my-20">
      <Title className="h4 mb-4">Telegram Unlock Bot</Title>
      <Card>
        <Title>Get Started</Title>
        <Text>Connect your wallet to get started.</Text>

        {!wallet.error ? null : (
          <ErrorText>{wallet.error.message}</ErrorText>
        )}

        <Button className="px-5" onClick={() => wallet.connect()}>
          Connect Wallet
        </Button>
      </Card>
    </div>
  )
}

export default ConnectWallet
