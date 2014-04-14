json.post_id @post.id
json.content @post.post_content
json.test_result_arsenic @post.test_result_arsenic
json.test_result_cholera_o1 @post.test_result_cholera_o1
json.test_result_cholera_o139 @post.test_result_cholera_o139
json.test_result_coliform @post.test_result_coliform
json.test_result_nitrite @post.test_result_nitrite
json.user @post.user.name
@post.images.each do |image|
    json.image_id image.id
end