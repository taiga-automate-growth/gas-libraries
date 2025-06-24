
```php
function register_custom_meta_fields() {
        register_meta('post', 'chapters', [
            'show_in_rest' => true,
            'type' => 'string', // JSONの場合はstringでOK
            'single' => true,
            'auth_callback' => function() {
                return current_user_can('edit_posts');
            }
        ]);
    }
    add_action('init', 'register_custom_meta_fields');    
```