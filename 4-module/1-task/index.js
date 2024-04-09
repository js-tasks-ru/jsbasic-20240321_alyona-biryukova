function makeFriendsList(friends) {
  const ul = document.createElement("ul");
  let template = "";

  for (let friend of friends) {
    template += `<li>${friend.firstName} ${friend.lastName}</li>`;
  }

  ul.innerHTML = template;

  return ul;
}
