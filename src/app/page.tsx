'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

interface Transaction {
  hash: string
  from: string
  to: string | null
}

interface Block {
  number: number
  hash: string
  timestamp: number
  transactions: Transaction[]
}

export default function Explorer() {
  const [latestBlock, setLatestBlock] = useState<Block | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.zazzle.network')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const block = await provider.getBlock('latest')
        if (block) {
          setLatestBlock(block)
          setTransactions(block.transactions as unknown as Transaction[])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!latestBlock) return <div>Loading...</div>

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">ZNET Explorer</h1>
      
      <div className="mb-8 bg-white shadow rounded p-6">
        <h2 className="text-2xl mb-4">Latest Block: {latestBlock.number}</h2>
        <p className="mb-2">Hash: {latestBlock.hash}</p>
        <p>Timestamp: {new Date(latestBlock.timestamp * 1000).toLocaleString()}</p>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl mb-4">Recent Transactions</h2>
        {transactions.map((tx: Transaction) => (
          <div key={tx.hash} className="p-4 border mb-2 rounded hover:bg-gray-50">
            <p className="font-mono text-sm mb-1">Hash: {tx.hash}</p>
            <p className="font-mono text-sm mb-1">From: {tx.from}</p>
            <p className="font-mono text-sm">To: {tx.to ?? 'Contract Creation'}</p>
          </div>
        ))}
      </div>
    </main>
  )
} 