class Api::MessagesController < ApplicationController
  before_action :set_group
  def index
    @messages = @group.messages.where(id: last_message_id).includes(user)
    respond_to do |format|
      format.html
      format.json
    end
  end
  def set_group
    @group = Group.find(params[:group_id])
  end
end
