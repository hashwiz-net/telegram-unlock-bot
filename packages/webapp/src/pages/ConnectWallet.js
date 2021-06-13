import React from 'react'
import Button from '../components/basic/Button'
import Card from '../components/basic/Card'
import Title from '../components/basic/Title'
import Text from '../components/basic/Text'
import useWeb3Wallet from '../utils/useWeb3Wallet'
import ErrorText from '../components/basic/ErrorText'

const ConnectWallet = () => {
  const { wallet } = useWeb3Wallet()
  return (
    <div className="container md:w-2/6 my-20">
      <Title className="text-xl mb-6">Telegram Unlock Bot</Title>
      <Card>
        <Title>Get Started</Title>
        <Text>Connect your wallet to get started.</Text>

        {!wallet.error ? null : (
          <ErrorText>{wallet.error.message}</ErrorText>
        )}

        <Button onClick={() => wallet.connect()}>
          Connect Wallet
        </Button>
      </Card>
    </div>
  )
}

export default ConnectWallet
