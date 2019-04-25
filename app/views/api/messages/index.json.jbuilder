json.array!@messages do |message|
  json.id message.id
  json.content message.content
  json.image message.image
  json.created_at format_posted_time(message.created_at)
  json.user_name message.user.user_name
end