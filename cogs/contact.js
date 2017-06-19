exports.run = (client, message, args) => {
  client.users.get('202186161039474689').sendMessage(args.join(" "));
}