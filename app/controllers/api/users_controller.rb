class Api::UsersController < ApplicationController
    # before_action :require_no_user!, only: [:create]
    # before_action :require_user!, only: [:destroy, :show, :update]
    def index
        @users = User.all
        render json: @users
    end
    def create
        @user = User.new(user_params)
        if @user.save 
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find(params[:id])
        render "api/users/show"
    end

    def update
    end

    def destroy
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

end