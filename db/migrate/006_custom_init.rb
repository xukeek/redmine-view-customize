class CustomInit < ActiveRecord::Migration[5.2]
  def up
    ViewCustomize.reset_column_information
    comment = 'PR form custom'
    old = ViewCustomize.where(comments: comment).first
    old.destroy if old

    cv = ViewCustomize.new
    params = {
      :comments => comment,
      :path_pattern => '/issues/new',

    }
    cv.comments = comment
    cv.path_pattern = '/issues/new'
    cv.insertion_position = 'issue_form'
    cv.is_enabled = true
    cv.customize_type = 'javascript'
    cv.code = File.read(File.expand_path("../../migrate/extra/pr.js", __FILE__))
    cv.save!
  end

  def down

  end
end