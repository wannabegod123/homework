<?php 

	$msg = "";
	$msgClass = "";

	//创建一个拟定位数据库名字的数组
	$arrName = ["light","sumnos","cobain","nirvana","brucelee"];

	//判断当前submit按钮成功获取到
	if(filter_has_var(INPUT_POST, "submit")){

		//获取用户名 密码 确认密码
		$name = htmlentities($_POST['name']);
		$password = htmlentities($_POST['password']);
		$repassword = htmlentities($_POST['repassword']);
		//用户名 密码 确认密码都存在时
		if(!empty($name) && !empty($password) && !empty($repassword)){
			//判断用户名 和 数组中的值(假定数组中有固定的用户名) 是否相同
			for ($i=0; $i < count($arrName); $i++) { 
				if($arrName[$i]==$name){
					//判断用户名是否存在
					$msg = "用户名已经存在!";
					$msgClass ="alert-danger"; 
				}else{
					//如果不存在 发现了就添加 添加了就跳出 不然for会一直跑
					array_push($arrName, $name);
					break;
				}	
			}
			//判断两次密码是否相同
			$arrPassword = [];
			array_push($arrPassword, $password);
			if($arrPassword[0]==$repassword){
				if($msg == "用户名已经存在!"){
					$msgClass ="alert-danger"; 
				}else{
					$msg = "注册成功!";
					$msgClass = "alert-success";
				}
			}else{
				$msg = "请确保两次输入的值相同!";
				$msgClass = "alert-danger";
			}
		}else{
			$msg = "请保证你的信息全部输入！";
			$msgClass = "alert-danger";
		}
	}
 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Register</title>
	<link rel="stylesheet" href="http://bootswatch.com/slate/bootstrap.min.css">
</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container">
			<div class="navheader">
				<a href="index.php" class="navbar-brand">Register Page</a>
			</div>
		</div>
	</nav>

	<div class="container">

			<!-- 提示用户 -->
		<?php 
			if ($msg!=""):
		?>
			<div class="alert <?php echo $msgClass; ?>">
				<?php echo $msg; ?>	
			</div>
		<?php endif ?>

		<form action="index.php" method="POST">
			<label for="">Name</label>
			<input type="text" placeholder="用户名:" class="form-control" name="name">
			<label for="">Password</label>
			<input type="password" placeholder="密码:" class="form-control" name="password">
			<label for="">Repassward</label>
			<input type="password" placeholder="确认密码:" class="form-control" name="repassword">
			<hr>	
			<button type="submit" class="btn btn-info" name="submit">提交页面</button>
		</form>
	</div>
</body>
</html>