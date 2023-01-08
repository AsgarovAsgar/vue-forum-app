import { docToResource, findById, upsert, makeAppendChildToParentMutation } from "@/helpers";

export default {
  setItem(state, { resource, item }) {
    upsert(state[resource].items, docToResource(item));
    // const userIndex = state.users.findIndex(user => user.id === userId)
    // state.users[userIndex] = user
  },
  appendUnsubscribe(state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe);
  },
  clearAllUnsubscribes(state) {
    state.unsubscribes = []
  },
};
