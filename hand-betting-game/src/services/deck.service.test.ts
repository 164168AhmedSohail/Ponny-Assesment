import { DeckService } from './deck.service'
import { GAME_CONFIG } from 'constants/config.constants'

describe('DeckService', () => {
  let deckService: DeckService

  beforeEach(() => {
    deckService = new DeckService()
  })

  it('creates a shuffled deck of 136 tiles', () => {
    const deck = deckService.createShuffledDeck()
    expect(deck).toHaveLength(136)
  })

  it('draws a hand of 4 tiles', () => {
    const deck = deckService.createShuffledDeck()
    const result = deckService.drawHand(deck, [], 0)
    expect(result.hand).toHaveLength(4)
    expect(result.newDrawPile).toHaveLength(132)
  })

  it('reshuffles when draw pile runs out', () => {
    const smallDeck = deckService.createShuffledDeck().slice(0, 3)
    const discard = deckService.createShuffledDeck().slice(0, 10)
    const result = deckService.drawHand(smallDeck, discard, 0)
    expect(result.reshuffled).toBe(true)
    expect(result.newReshuffleCount).toBe(1)
    expect(result.hand).toHaveLength(4)
  })

  it('returns empty hand when reshuffle limit is exceeded', () => {
    const smallDeck: never[] = []
    const result = deckService.drawHand(
      smallDeck,
      [],
      GAME_CONFIG.deck.maxReshuffles
    )
    expect(result.hand).toHaveLength(0)
    expect(result.reshuffled).toBe(false)
  })

  it('discards hand to discard pile', () => {
    const deck = deckService.createShuffledDeck()
    const { hand } = deckService.drawHand(deck, [], 0)
    const discard = deckService.discardHand(hand, [])
    expect(discard).toHaveLength(4)
  })
})
