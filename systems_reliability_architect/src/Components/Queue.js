class Queue {
    #queue = {}
    #head = 0
    #tail = 0
  
    push(data) {
      this.#queue[this.#tail] = data
      this.#tail++
    }
  
    get front() {
      return this.#queue[this.#head]
    }
  
    get size() {
      return this.#tail - this.#head
    }
  
    pop() {
      if (this.size === 0) return
  
      const data = this.#queue[this.#head]
      delete this.#queue[this.#head]
      this.#head++
      return data
    }

    copy() {
      let new_queue = new Queue()

      new_queue.#queue = this.#queue.copy()
      new_queue.#tail = this.#tail
      new_queue.#head = this.#head
    }
}

export default Queue;