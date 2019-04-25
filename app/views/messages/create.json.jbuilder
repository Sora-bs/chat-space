json.user_name   @message.user.name
json.content   @message.content
json.image    @message.image_url
json.time   @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id
