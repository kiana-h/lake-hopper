class Api::SessionsController < ApplicationController
    # before_action :require_no_user!, only:[:create]
    # before_action :require_user!, only:[:destroy]

    def create
        @user = User.find_by_credentials(
            params[:user][:username] , 
            params[:user][:password]
        )

        if @user 
            login!(user)
            render "api/users/show"
        else
            render json: ["Invalid username/password combination"], status :401
        end
    end

    def destroy
        @user = current_user
        if @user
            logout
            render root_url            
        else
            render json: ["Nobody is currently signed in"], status: 404
        end
    end
end