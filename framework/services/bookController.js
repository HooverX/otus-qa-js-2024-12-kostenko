import { post, put, get, del } from './apiService2.js'

export async function createBook(userId, isbn) {
  console.log('[createBook] called with:', { userId, isbn })

  try {
    const response = await post('BookStore/v1/Books', {
      userId,
      collectionOfIsbns: [{ isbn }]
    })
    console.log('[createBook] response:', response)
    return response
  } catch (error) {
    console.error('[createBook] error:', error)
    throw error
  }
}

export async function getBook(isbn) {
  console.log('[getBook] called with ISBN:', isbn)

  try {
    const response = await get(`BookStore/v1/Book?ISBN=${isbn}`)
    console.log('[getBook] response:', response)
    return response
  } catch (error) {
    console.error('[getBook] error:', error)
    throw error
  }
}

export async function updateBook(userId, oldIsbn, newIsbn) {
  console.log('[updateBook] called with:', { userId, oldIsbn, newIsbn })

  try {
    const response = await put('BookStore/v1/Books/' + oldIsbn, {
      userId,
      isbn: newIsbn
    })
    console.log('[updateBook] response:', response)
    return response
  } catch (error) {
    console.error('[updateBook] error:', error)
    throw error
  }
}

export async function deleteBook(userId, isbn) {
  console.log('[deleteBook] called with:', { userId, isbn })

  try {
    const response = await del('BookStore/v1/Book', {
      userId,
      isbn
    })
    console.log('[deleteBook] response:', response)
    return response
  } catch (error) {
    console.error('[deleteBook] error:', error)
    throw error
  }
}
